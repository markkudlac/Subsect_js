# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160713221352) do

  create_table "appzips", force: :cascade do |t|
    t.integer  "user_id",                                  null: false
    t.text     "zipfile",                                  null: false
    t.string   "pkgname",     limit: 15
    t.integer  "filesize",                 default: 0
    t.string   "title",       limit: 40
    t.text     "description", limit: 1500
    t.text     "icon"
    t.string   "dbtype",      limit: 2,    default: "U_"
    t.string   "status",      limit: 1,    default: "A"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.string   "permissions", limit: 3,    default: "FFF"
    t.index ["pkgname"], name: "index_appzips_on_pkgname"
    t.index ["user_id"], name: "index_appzips_on_user_id"
  end

  create_table "servers", force: :cascade do |t|
    t.string   "subname",    limit: 20,               null: false
    t.string   "deviceid",   limit: 50,               null: false
    t.string   "rtcid",      limit: 20
    t.string   "status",     limit: 1,  default: "A", null: false
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "passwd",     limit: 40
    t.string   "contact",    limit: 50
    t.index ["subname"], name: "index_servers_on_subname", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
