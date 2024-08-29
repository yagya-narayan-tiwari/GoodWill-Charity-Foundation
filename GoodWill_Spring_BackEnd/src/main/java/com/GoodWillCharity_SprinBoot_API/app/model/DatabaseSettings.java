package com.GoodWillCharity_SprinBoot_API.app.model;


import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "database")
public class DatabaseSettings {

    private String connectionString;
    private String dbName;
    private String ngoCollection;
    private String donorCollection;
    private String adminCollection;
    private String charityCollection;
    private String orderCollection;

    // Getters and Setters
    public String getConnectionString() {
        return connectionString;
    }

    public void setConnectionString(String connectionString) {
        this.connectionString = connectionString;
    }

    public String getDbName() {
        return dbName;
    }

    public void setDbName(String dbName) {
        this.dbName = dbName;
    }

    public String getNgoCollection() {
        return ngoCollection;
    }

    public void setNgoCollection(String ngoCollection) {
        this.ngoCollection = ngoCollection;
    }

    public String getDonorCollection() {
        return donorCollection;
    }

    public void setDonorCollection(String donorCollection) {
        this.donorCollection = donorCollection;
    }

    public String getAdminCollection() {
        return adminCollection;
    }

    public void setAdminCollection(String adminCollection) {
        this.adminCollection = adminCollection;
    }

    public String getCharityCollection() {
        return charityCollection;
    }

    public void setCharityCollection(String charityCollection) {
        this.charityCollection = charityCollection;
    }

    public String getOrderCollection() {
        return orderCollection;
    }

    public void setOrderCollection(String orderCollection) {
        this.orderCollection = orderCollection;
    }
}
