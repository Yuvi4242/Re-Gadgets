import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import app from '../app.js';
import User from '../models/userModel.js';
import Order from '../models/Order.js';
import RepairBooking from '../models/RepairBooking.js';
import RepairRecord from '../models/RepairRecord.js';
import Worker from '../models/Worker.js';
import Shop from '../models/Shop.js';

dotenv.config();

process.env.NODE_ENV = 'test';
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET || 'test_access_secret_123456789012345';
process.env.ACCESS_TOKEN_SECRET = ACCESS_SECRET;

let server;
let baseUrl;

// Test fixtures
let customerUser1;
let customerUser2;
let technicianUser1;
let technicianUser2;
let worker1;
let worker2;
let shop1;
let order1;
let order2;
let booking1;

let customer1Token;
let customer2Token;
let technician1Token;
let technician2Token;

const createToken = (user) => {
  return jwt.sign(
    { userId: user._id.toString(), id: user._id.toString(), role: user.role },
    ACCESS_SECRET,
    { expiresIn: '1h' }
  );
};

// Simple HTTP request helper using native fetch
const apiRequest = async (path, options = {}) => {
  const url = `${baseUrl}${path}`;
  const headers = { ...(options.headers || {}) };

  const res = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body,
  });

  const contentType = res.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await res.json()
    : await res.text();

  return { status: res.status, headers: res.headers, data };
};

test.before(async () => {
  // Connect to DB
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/re-gadgets';
  await mongoose.connect(mongoUri);

  // Start HTTP server on dynamic port
  server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  baseUrl = `http://localhost:${port}`;

  const suffix = Date.now().toString().slice(-6);

  // Setup test users
  customerUser1 = await User.create({
    name: `Customer One ${suffix}`,
    email: `cust1_${suffix}@test.com`,
    password: 'Password123!',
    role: 'customer',
    isVerified: true,
  });

  customerUser2 = await User.create({
    name: `Customer Two ${suffix}`,
    email: `cust2_${suffix}@test.com`,
    password: 'Password123!',
    role: 'customer',
    isVerified: true,
  });

  technicianUser1 = await User.create({
    name: `Tech One ${suffix}`,
    email: `tech1_${suffix}@test.com`,
    password: 'Password123!',
    role: 'technician',
    isVerified: true,
  });

  technicianUser2 = await User.create({
    name: `Tech Two ${suffix}`,
    email: `tech2_${suffix}@test.com`,
    password: 'Password123!',
    role: 'technician',
    isVerified: true,
  });

  shop1 = await Shop.create({
    userId: technicianUser1._id,
    shopName: `Apex Diagnostics ${suffix}`,
    shopCategory: 'Mobile & Electronics',
    address: '123 Tech Lane',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    phone: '9876543210',
    locationCoordinates: {
      type: 'Point',
      coordinates: [72.8777, 19.0760],
    },
    servicesOffered: ['Mobile Repair', 'Screen Replacement'],
  });

  worker1 = await Worker.create({
    shopId: shop1._id,
    userId: technicianUser1._id,
    name: `Tech One ${suffix}`,
    email: technicianUser1.email,
  });

  worker2 = await Worker.create({
    shopId: shop1._id,
    userId: technicianUser2._id,
    name: `Tech Two ${suffix}`,
    email: technicianUser2.email,
  });

  booking1 = await RepairBooking.create({
    customer: customerUser1._id,
    shopId: 101,
    shopName: shop1.shopName,
    customerName: customerUser1.name,
    customerPhone: '9876543210',
    deviceType: 'iPhone 13 Pro',
    serviceType: 'Display Replacement',
    issueDescription: 'Cracked OLED screen after drop',
    preferredDateTime: new Date(),
    estimatedAmount: 250,
    status: 'confirmed',
  });

  order1 = await Order.create({
    _id: booking1._id,
    customer: customerUser1._id,
    deviceType: 'Mobile Repair',
    deviceModel: 'iPhone 13 Pro',
    issue: 'Cracked OLED screen after drop',
    pickupAddress: '123 Customer St',
    status: 'Repairing',
    workerId: worker1._id,
    shopId: shop1._id,
    price: 250,
  });

  // Second order for tech 2
  order2 = await Order.create({
    customer: customerUser2._id,
    deviceType: 'Laptop Repair',
    deviceModel: 'MacBook Pro M1',
    issue: 'Battery replacement needed',
    pickupAddress: '456 Customer Ave',
    status: 'Repairing',
    workerId: worker2._id,
    shopId: shop1._id,
    price: 180,
  });

  customer1Token = createToken(customerUser1);
  customer2Token = createToken(customerUser2);
  technician1Token = createToken(technicianUser1);
  technician2Token = createToken(technicianUser2);
});

test.after(async () => {
  // Cleanup
  if (booking1) await RepairBooking.findByIdAndDelete(booking1._id);
  if (order1) await Order.findByIdAndDelete(order1._id);
  if (order2) await Order.findByIdAndDelete(order2._id);
  await RepairRecord.deleteMany({
    customer: { $in: [customerUser1?._id, customerUser2?._id] },
  });
  if (customerUser1) await User.findByIdAndDelete(customerUser1._id);
  if (customerUser2) await User.findByIdAndDelete(customerUser2._id);
  if (technicianUser1) await User.findByIdAndDelete(technicianUser1._id);
  if (technicianUser2) await User.findByIdAndDelete(technicianUser2._id);
  if (worker1) await Worker.findByIdAndDelete(worker1._id);
  if (worker2) await Worker.findByIdAndDelete(worker2._id);
  if (shop1) await Shop.findByIdAndDelete(shop1._id);

  if (server) await new Promise((resolve) => server.close(resolve));
  await mongoose.disconnect();
});

// AC1: Record reported issues, services performed, replaced parts, and total repair costs
test('AC1: Technician can create repair record with issues, services, replaced parts, total cost and warranty', async () => {
  const payload = {
    bookingId: order1._id.toString(),
    deviceModel: 'iPhone 13 Pro',
    deviceType: 'Smartphone',
    serialNumber: 'SN-IP13P-99281',
    reportedIssues: ['Cracked OLED screen', 'Touch digitizer unresponsive'],
    servicesPerformed: ['OLED assembly replacement', 'Water seal re-applied', 'Display calibration'],
    replacedParts: [
      { name: 'OEM OLED Display Assembly', cost: 180 },
      { name: 'Adhesive Water Seal Kit', cost: 15 },
    ],
    totalCost: 220,
    warranty: {
      periodMonths: 6,
      policy: '6-Month parts and labor warranty',
    },
    status: 'in_progress',
    notes: 'FaceID flex preserved intact, frame cleaned.',
  };

  const res = await apiRequest('/api/repair-records', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${technician1Token}`,
    },
    body: JSON.stringify(payload),
  });

  assert.equal(res.status, 200);
  assert.equal(res.data.success, true);
  assert.ok(res.data.record);
  assert.equal(res.data.record.deviceModel, 'iPhone 13 Pro');
  assert.equal(res.data.record.totalCost, 220);
  assert.equal(res.data.record.replacedParts.length, 2);
  assert.equal(res.data.record.replacedParts[0].name, 'OEM OLED Display Assembly');
  assert.equal(res.data.record.replacedParts[0].cost, 180);
  assert.equal(res.data.record.servicesPerformed.length, 3);
  assert.equal(res.data.record.warranty.periodMonths, 6);
  assert.ok(res.data.record.warranty.expiryDate);
});

// AC2 & AC3: Upload before and after photos, linked side-by-side
test('AC2 & AC3: Technician uploads before photo, then after photo, and both are linked for side-by-side display', async () => {
  // 1. Upload Before Photo
  const beforeFormData = new FormData();
  const fakeBeforeJpg = new Blob([Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46])], {
    type: 'image/jpeg',
  });
  beforeFormData.append('photo', fakeBeforeJpg, 'before_repair.jpg');
  beforeFormData.append('type', 'before');
  beforeFormData.append('caption', 'Front screen glass shattered on arrival');

  const beforeRes = await fetch(`${baseUrl}/api/repair-records/${order1._id}/photos`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${technician1Token}`,
    },
    body: beforeFormData,
  });

  const beforeData = await beforeRes.json();
  assert.equal(beforeRes.status, 200);
  assert.equal(beforeData.success, true);
  assert.equal(beforeData.photo.type, 'before');
  assert.ok(beforeData.photo.url);

  // 2. Upload After Photo
  const afterFormData = new FormData();
  const fakeAfterPng = new Blob([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])], {
    type: 'image/png',
  });
  afterFormData.append('photo', fakeAfterPng, 'after_repair.png');
  afterFormData.append('type', 'after');
  afterFormData.append('caption', 'Pristine OLED fitted and tested fully functional');

  const afterRes = await fetch(`${baseUrl}/api/repair-records/${order1._id}/photos`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${technician1Token}`,
    },
    body: afterFormData,
  });

  const afterData = await afterRes.json();
  assert.equal(afterRes.status, 200);
  assert.equal(afterData.success, true);
  assert.equal(afterData.photo.type, 'after');

  // 3. Verify side-by-side availability: fetch the complete record
  const fetchRes = await apiRequest(`/api/repair-records/${order1._id}`, {
    headers: { Authorization: `Bearer ${technician1Token}` },
  });

  assert.equal(fetchRes.status, 200);
  const photos = fetchRes.data.record.photos;
  assert.equal(photos.length, 2);

  const beforeRecord = photos.find((p) => p.type === 'before');
  const afterRecord = photos.find((p) => p.type === 'after');
  assert.ok(beforeRecord, 'Must have a "before" photo');
  assert.ok(afterRecord, 'Must have an "after" photo');
  assert.ok(beforeRecord.url, 'Before photo must have a valid URL');
  assert.ok(afterRecord.url, 'After photo must have a valid URL');
});

// AC4: Allow customers to view repair history and photos for their own devices only
test('AC4: Customers can view the repair history and side-by-side photos for their own devices only', async () => {
  // Customer 1 fetches their own repair history
  const res = await apiRequest('/api/repair-records/customer/history', {
    headers: { Authorization: `Bearer ${customer1Token}` },
  });

  assert.equal(res.status, 200);
  assert.equal(res.data.success, true);
  assert.ok(res.data.history.length >= 1);

  const ownRecord = res.data.history[0];
  assert.equal(ownRecord.deviceModel, 'iPhone 13 Pro');
  assert.equal(ownRecord.photos.length, 2);
  assert.equal(ownRecord.replacedParts.length, 2);
  assert.equal(ownRecord.totalCost, 220);

  // Customer 1 queries device history by deviceIdentifier
  const deviceRes = await apiRequest(`/api/repair-records/device/${ownRecord.deviceIdentifier}`, {
    headers: { Authorization: `Bearer ${customer1Token}` },
  });

  assert.equal(deviceRes.status, 200);
  assert.ok(deviceRes.data.history.length >= 1);
  assert.equal(deviceRes.data.history[0].deviceModel, 'iPhone 13 Pro');
});

// Edge Case 1: Missing required fields
test('Edge Case 1: Missing bookingId returns 400 Bad Request', async () => {
  const res = await apiRequest('/api/repair-records', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${technician1Token}`,
    },
    body: JSON.stringify({ deviceModel: 'iPhone 13 Pro' }),
  });

  assert.equal(res.status, 400);
  assert.equal(res.data.success, false);
});

// Edge Case 2: Invalid file type rejected
test('Edge Case 2: Uploading an invalid file type (e.g. .txt or .pdf) returns 400 Bad Request', async () => {
  const badFormData = new FormData();
  const fakeTxt = new Blob(['Not an image file'], { type: 'text/plain' });
  badFormData.append('photo', fakeTxt, 'malicious.txt');
  badFormData.append('type', 'before');

  const res = await fetch(`${baseUrl}/api/repair-records/${order1._id}/photos`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${technician1Token}` },
    body: badFormData,
  });

  assert.equal(res.status, 400);
  const data = await res.json();
  assert.equal(data.success, false);
  assert.match(data.message, /only jpg, png, and webp/i);
});

// Edge Case 3: Oversized file rejected (> 5MB)
test('Edge Case 3: Uploading a file exceeding 5MB returns 400 Bad Request', async () => {
  const largeBuffer = Buffer.alloc(6 * 1024 * 1024); // 6 MB
  const largeBlob = new Blob([largeBuffer], { type: 'image/jpeg' });

  const largeFormData = new FormData();
  largeFormData.append('photo', largeBlob, 'oversized.jpg');
  largeFormData.append('type', 'before');

  const res = await fetch(`${baseUrl}/api/repair-records/${order1._id}/photos`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${technician1Token}` },
    body: largeFormData,
  });

  assert.equal(res.status, 400);
  const data = await res.json();
  assert.equal(data.success, false);
  assert.match(data.message, /5mb/i);
});

// Edge Case 4: Unauthorized access
test('Edge Case 4: Unauthenticated and unauthorized requests are rejected (401 / 403)', async () => {
  // No token -> 401
  const unauthRes = await apiRequest('/api/repair-records/customer/history');
  assert.equal(unauthRes.status, 401);

  // Customer trying to POST a repair record (technician-only) -> 403
  const forbiddenRes = await apiRequest('/api/repair-records', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${customer1Token}`,
    },
    body: JSON.stringify({ bookingId: order1._id.toString() }),
  });
  assert.equal(forbiddenRes.status, 403);
});

// Edge Case 5: Customer attempting to access another customer's device repair history
test('Edge Case 5: Customer cannot view another customer device record (403 or empty array)', async () => {
  // Customer 2 tries to GET Customer 1's specific repair record by ID -> 403 Forbidden
  const forbiddenRecordRes = await apiRequest(`/api/repair-records/${order1._id}`, {
    headers: { Authorization: `Bearer ${customer2Token}` },
  });

  assert.equal(forbiddenRecordRes.status, 403);
  assert.equal(forbiddenRecordRes.data.success, false);

  // Customer 2 tries to search Customer 1's deviceIdentifier -> isolated to own devices only
  const deviceRes = await apiRequest('/api/repair-records/device/SN-IP13P-99281', {
    headers: { Authorization: `Bearer ${customer2Token}` },
  });

  assert.equal(deviceRes.status, 200);
  assert.equal(deviceRes.data.history.length, 0, 'Must never leak other customers device history');
});

// Edge Case 6: An 'after' photo without a 'before' photo is rejected
test('Edge Case 6: Uploading an "after" photo before a "before" photo exists returns 400 Bad Request', async () => {
  // First create a fresh record for order2 (which has no photos)
  await apiRequest('/api/repair-records', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${technician2Token}`,
    },
    body: JSON.stringify({
      bookingId: order2._id.toString(),
      deviceModel: 'MacBook Pro M1',
      totalCost: 180,
    }),
  });

  // Now attempt to upload an 'after' photo directly without a 'before' photo
  const afterFormData = new FormData();
  const fakePng = new Blob([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])], {
    type: 'image/png',
  });
  afterFormData.append('photo', fakePng, 'premature_after.png');
  afterFormData.append('type', 'after');

  const res = await fetch(`${baseUrl}/api/repair-records/${order2._id}/photos`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${technician2Token}` },
    body: afterFormData,
  });

  assert.equal(res.status, 400);
  const data = await res.json();
  assert.equal(data.success, false);
  assert.match(data.message, /after.*before/i);
});

// Edge Case 7: A repair with no photos is handled gracefully
test('Edge Case 7: Repair record with no photos is retrieved gracefully without errors', async () => {
  const res = await apiRequest(`/api/repair-records/${order2._id}`, {
    headers: { Authorization: `Bearer ${technician2Token}` },
  });

  assert.equal(res.status, 200);
  assert.equal(res.data.success, true);
  assert.ok(Array.isArray(res.data.record.photos));
  assert.equal(res.data.record.photos.length, 0);
});

// Edge Case 8: Technician attempting to modify a repair booking they do not handle
test('Edge Case 8: Technician cannot manage a repair record for a booking they do not handle (403 Forbidden)', async () => {
  // Technician 2 tries to update Order 1 (handled by Technician 1)
  const res = await apiRequest('/api/repair-records', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${technician2Token}`,
    },
    body: JSON.stringify({
      bookingId: order1._id.toString(),
      deviceModel: 'iPhone 13 Pro',
      totalCost: 300,
    }),
  });

  assert.equal(res.status, 403);
  assert.equal(res.data.success, false);
  assert.match(res.data.message, /unauthorized.*bookings they handle/i);
});
