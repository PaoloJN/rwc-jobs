import { pgTable, varchar, text, boolean, serial } from "drizzle-orm/pg-core";

export const jobs = pgTable("jobs", {
    id: serial("id").primaryKey(),
    jobId: varchar("job_id", { length: 255 }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    companyName: varchar("company_name", { length: 255 }),
    location: varchar("location", { length: 255 }),
    via: varchar("via", { length: 100 }),
    shareLink: text("share_link"),
    thumbnail: text("thumbnail"),
    description: text("description"),
});

export const jobExtensions = pgTable("job_extensions", {
    id: serial("id").primaryKey(),
    jobId: varchar("job_id", { length: 255 })
        .references(() => jobs.id)
        .notNull(),
    postedAt: varchar("posted_at", { length: 50 }),
    workFromHome: boolean("work_from_home"),
    scheduleType: varchar("schedule_type", { length: 50 }),
    qualifications: text("qualifications"),
    healthInsurance: boolean("health_insurance"),
    paidTimeOff: boolean("paid_time_off"),
    dentalCoverage: boolean("dental_coverage"),
});

export const jobHighlights = pgTable("job_highlights", {
    id: serial("id").primaryKey(),
    jobId: varchar("job_id", { length: 255 })
        .references(() => jobs.id)
        .notNull(),
    title: varchar("title", { length: 100 }).notNull(),
});

export const highlightItems = pgTable("highlight_items", {
    id: serial("id").primaryKey(),
    highlightId: varchar("highlight_id", { length: 255 })
        .references(() => jobHighlights.id)
        .notNull(),
    item: text("item").notNull(),
});

export const applyOptions = pgTable("apply_options", {
    id: serial("id").primaryKey(),
    jobId: varchar("job_id", { length: 255 })
        .references(() => jobs.id)
        .notNull(),
    title: varchar("title", { length: 100 }),
    link: text("link"),
});

// Define the types for inserting and selecting data
export type InsertJob = typeof jobs.$inferInsert;
export type SelectJob = typeof jobs.$inferSelect;

export type InsertJobExtension = typeof jobExtensions.$inferInsert;
export type SelectJobExtension = typeof jobExtensions.$inferSelect;

export type InsertJobHighlight = typeof jobHighlights.$inferInsert;
export type SelectJobHighlight = typeof jobHighlights.$inferSelect;

export type InsertHighlightItem = typeof highlightItems.$inferInsert;
export type SelectHighlightItem = typeof highlightItems.$inferSelect;

export type InsertApplyOption = typeof applyOptions.$inferInsert;
export type SelectApplyOption = typeof applyOptions.$inferSelect;
