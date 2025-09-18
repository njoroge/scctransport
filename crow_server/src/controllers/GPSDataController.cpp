#include "GPSDataController.hpp"
#include "models/GPSDataModel.hpp"
#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/json.hpp>
#include <mongocxx/exception/exception.hpp>
#include <mongocxx/pipeline.hpp>

crow::response GPSDataController::submitGPSData(const crow::request& req) {
    auto body = crow::json::load(req.body);
    if (!body) {
        return crow::response(400);
    }

    bsoncxx::oid vehicleId(std::string(body["vehicleId"].s()));
    double latitude = body["latitude"].d();
    double longitude = body["longitude"].d();

    GPSData new_gps_data(vehicleId, latitude, longitude);

    auto collection = db["gpsdata"];
    try {
        collection.insert_one(new_gps_data.to_bson());
    } catch (const mongocxx::exception& e) {
        return crow::response(500, e.what());
    }

    crow::json::wvalue res;
    res["message"] = "GPS data submitted successfully";
    return crow::response(201, res);
}

crow::response GPSDataController::getLatestGpsData(const crow::request& req) {
    auto collection = db["gpsdata"];
    mongocxx::pipeline p{};
    p.sort(bsoncxx::builder::stream::document{} << "timestamp" << -1 << bsoncxx::builder::stream::finalize);
    p.group(bsoncxx::builder::stream::document{} << "_id" << "$vehicleId" << "latest_doc" << bsoncxx::builder::stream::open_document << "$first" << "$$ROOT" << bsoncxx::builder::stream::close_document << bsoncxx::builder::stream::finalize);

    bsoncxx::builder::stream::document replace_root_builder{};
    replace_root_builder << "newRoot" << "$latest_doc";
    p.replace_root(replace_root_builder.view());

    auto cursor = collection.aggregate(p);

    crow::json::wvalue::list res_list;
    for (auto doc : cursor) {
        res_list.push_back(crow::json::wvalue(bsoncxx::to_json(doc)));
    }

    return crow::response(200, crow::json::wvalue(res_list));
}

crow::response GPSDataController::getGpsDataForVehicle(const crow::request& req, const std::string& vehicleId) {
    if (vehicleId.empty()) {
        return crow::response(400, "Vehicle ID is required.");
    }

    auto collection = db["gpsdata"];
    auto cursor = collection.find(bsoncxx::builder::stream::document{} << "vehicleId" << bsoncxx::oid(vehicleId) << bsoncxx::builder::stream::finalize);

    crow::json::wvalue::list res_list;
    for (auto doc : cursor) {
        res_list.push_back(crow::json::wvalue(bsoncxx::to_json(doc)));
    }

    return crow::response(200, crow::json::wvalue(res_list));
}
