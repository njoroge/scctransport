#pragma once

#include <string>
#include <vector>
#include <optional>
#include <bsoncxx/builder/stream/document.hpp>
#include <bsoncxx/json.hpp>
#include <bsoncxx/oid.hpp>
#include <bsoncxx/types.hpp>

struct Earning {
    std::string type;
    double amount;
    std::string description;
};

struct StatutoryDeductions {
    double paye;
    double nssf;
    double shif;
    double affordableHousingLevy;
    double helb;
};

struct SaccoDeductions {
    double shares;
    double loanRepayment;
    double memberDeposits;
};

struct OtherDeduction {
    std::string type;
    double amount;
    std::string description;
};

class PayrollRecord {
public:
    PayrollRecord(bsoncxx::oid crewMember, std::string payPeriodStartDate, std::string payPeriodEndDate, std::vector<Earning> earnings)
        : crewMember(crewMember), payPeriodStartDate(payPeriodStartDate), payPeriodEndDate(payPeriodEndDate), earnings(earnings) {}

    bsoncxx::document::value to_bson() const {
        bsoncxx::builder::stream::document builder{};
        builder << "crewMember" << crewMember
                << "payPeriodStartDate" << payPeriodStartDate
                << "payPeriodEndDate" << payPeriodEndDate;

        auto earnings_array = builder << "earnings" << bsoncxx::builder::stream::open_array;
        for (const auto& earning : earnings) {
            earnings_array << bsoncxx::builder::stream::open_document
                << "type" << earning.type
                << "amount" << earning.amount
                << "description" << earning.description
            << bsoncxx::builder::stream::close_document;
        }
        earnings_array << bsoncxx::builder::stream::close_array;

        return builder.extract();
    }

private:
    bsoncxx::oid _id;
    bsoncxx::oid crewMember;
    std::string payPeriodStartDate;
    std::string payPeriodEndDate;
    std::vector<Earning> earnings;
    double grossPay;
    StatutoryDeductions statutoryDeductions;
    SaccoDeductions saccoDeductions;
    std::vector<OtherDeduction> otherDeductions;
    double totalDeductions;
    double netPay;
};
