-- CreateTable
CREATE TABLE "def_api_endpoint_roles" (
    "api_endpoint_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,

    PRIMARY KEY ("api_endpoint_id", "role_id"),
    CONSTRAINT "def_api_endpoint_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "def_roles" ("role_id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "def_api_endpoint_roles_api_endpoint_id_fkey" FOREIGN KEY ("api_endpoint_id") REFERENCES "def_api_endpoints" ("api_endpoint_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "def_api_endpoints" (
    "api_endpoint_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "api_endpoint" TEXT,
    "parameter1" TEXT,
    "parameter2" TEXT,
    "method" TEXT,
    "privilege_id" INTEGER
);

-- CreateTable
CREATE TABLE "def_job_titles" (
    "job_title_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "job_title_name" TEXT
);

-- CreateTable
CREATE TABLE "def_persons" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT,
    "middle_name" TEXT,
    "last_name" TEXT,
    "job_title" TEXT
);

-- CreateTable
CREATE TABLE "def_privileges" (
    "privilege_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "privilege_name" TEXT
);

-- CreateTable
CREATE TABLE "def_roles" (
    "role_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role_name" TEXT
);

-- CreateTable
CREATE TABLE "def_tenant_enterprise_setup" (
    "tenant_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "enterprise_name" TEXT,
    "enterprise_type" TEXT
);

-- CreateTable
CREATE TABLE "def_tenants" (
    "tenant_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tenant_name" TEXT
);

-- CreateTable
CREATE TABLE "def_user_credentials" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "password" TEXT
);

-- CreateTable
CREATE TABLE "def_user_granted_privileges" (
    "user_id" INTEGER NOT NULL,
    "privilege_id" INTEGER NOT NULL,

    PRIMARY KEY ("user_id", "privilege_id"),
    CONSTRAINT "def_user_granted_privileges_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "def_users" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "def_user_granted_privileges_privilege_id_fkey" FOREIGN KEY ("privilege_id") REFERENCES "def_privileges" ("privilege_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "def_user_granted_roles" (
    "user_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,

    PRIMARY KEY ("user_id", "role_id"),
    CONSTRAINT "def_user_granted_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "def_users" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "def_user_granted_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "def_roles" ("role_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "def_user_types" (
    "user_type_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_type_name" TEXT
);

-- CreateTable
CREATE TABLE "def_users" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_name" TEXT,
    "user_type" TEXT,
    "email_addresses" TEXT,
    "created_by" INTEGER,
    "created_on" TEXT,
    "last_updated_by" INTEGER,
    "last_updated_on" TEXT,
    "tenant_id" INTEGER,
    CONSTRAINT "def_users_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "def_tenants" ("tenant_id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateIndex
CREATE UNIQUE INDEX "def_api_endpoints_api_endpoint_parameter1_parameter2_method_key" ON "def_api_endpoints"("api_endpoint", "parameter1", "parameter2", "method");
