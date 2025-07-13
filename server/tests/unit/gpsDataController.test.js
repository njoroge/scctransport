const httpMocks = require('node-mocks-http');
const { getLatestGpsData, getGpsDataForVehicle } = require('../../controllers/gpsDataController');
const GPSData = require('../../models/GPSDataModel');

jest.mock('../../models/GPSDataModel');

describe('GPSData Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getLatestGpsData', () => {
        it('should return the latest GPS data for each vehicle', async () => {
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            const mockData = [{ vehicleId: '1', latitude: 1, longitude: 1 }];
            GPSData.aggregate.mockResolvedValue(mockData);

            await getLatestGpsData(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(mockData);
        });

        it('should handle errors', async () => {
            const req = httpMocks.createRequest();
            const res = httpMocks.createResponse();
            GPSData.aggregate.mockRejectedValue(new Error('Error'));

            await getLatestGpsData(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ message: 'Server error' });
        });
    });

    describe('getGpsDataForVehicle', () => {
        it('should return all GPS data for a specific vehicle', async () => {
            const req = httpMocks.createRequest({ params: { vehicleId: '1' } });
            const res = httpMocks.createResponse();
            const mockData = [{ vehicleId: '1', latitude: 1, longitude: 1 }];
            GPSData.find.mockReturnValue({ sort: jest.fn().mockResolvedValue(mockData) });

            await getGpsDataForVehicle(req, res);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual(mockData);
        });

        it('should return 404 if no data is found', async () => {
            const req = httpMocks.createRequest({ params: { vehicleId: '1' } });
            const res = httpMocks.createResponse();
            GPSData.find.mockReturnValue({ sort: jest.fn().mockResolvedValue(null) });

            await getGpsDataForVehicle(req, res);

            expect(res.statusCode).toBe(404);
            expect(res._getJSONData()).toEqual({ message: 'GPS data not found for this vehicle' });
        });

        it('should handle errors', async () => {
            const req = httpMocks.createRequest({ params: { vehicleId: '1' } });
            const res = httpMocks.createResponse();
            GPSData.find.mockReturnValue({ sort: jest.fn().mockRejectedValue(new Error('Error')) });

            await getGpsDataForVehicle(req, res);

            expect(res.statusCode).toBe(500);
            expect(res._getJSONData()).toEqual({ message: 'Server error' });
        });
    });
});
