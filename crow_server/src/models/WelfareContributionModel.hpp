#pragma once

#include <string>
#include <vector>
#include <optional>
#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/json.hpp>
#include <bsoncxx/oid.hpp>
#include <bsoncxx/types.hpp>

class WelfareContribution {
public:
    WelfareContribution(bsoncxx::oid member, double amount, std::string contributionType, std::string paymentMethod)
        : member(member), amount(amount), contributionType(contributionType), paymentMethod(paymentMethod) {}

    bsoncxx::document::value to_bson() const {
        bsoncxx::builder::stream::document builder{};
        builder << "member" << member
                << "amount" << amount
                << "contributionType" << contributionType
                << "paymentMethod" << paymentMethod;

        if (!referenceNumber.empty()) builder << "referenceNumber" << referenceNumber;
        if (recordedBy) builder << "recordedBy" << *recordedBy;

        return builder.extract();
    }

private:
    bsoncxx::oid _id;
    bsoncxx::oid member;
    double amount;
    std::string contributionType;
    std::string paymentMethod;
    std::string referenceNumber;
    std::optional<bsoncxx::oid> recordedBy;
};
