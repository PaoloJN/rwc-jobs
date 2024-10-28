import {
    SelectJob,
    InsertJob,
    SelectJobExtension,
    InsertJobExtension,
    SelectJobHighlight,
    InsertJobHighlight,
    SelectHighlightItem,
    InsertHighlightItem,
    SelectApplyOption,
    InsertApplyOption,
    jobs,
    jobExtensions,
    applyOptions,
    highlightItems,
    jobHighlights,
} from "./schema";

import { eq } from "drizzle-orm";
import { db } from "../database";

// Custom error class for database operations
class DatabaseError extends Error {
    constructor(message: string, public originalError?: unknown) {
        super(message);
        this.name = "DatabaseError";
    }
}

// Utility function for logging errors
function logError(error: Error) {
    console.error(`[${new Date().toISOString()}] ${error.name}: ${error.message}`);
    if (error instanceof DatabaseError && error.originalError) {
        console.error("Original error:", error.originalError);
    }
}

// Create a new job
export async function createJob(jobData: InsertJob): Promise<void> {
    if (!jobData) throw new Error("Invalid job data");
    try {
        await db.insert(jobs).values(jobData);
    } catch (error) {
        const dbError = new DatabaseError("Failed to create job", error);
        logError(dbError);
        throw dbError;
    }
}

// Retrieve all jobs
export async function getJobs(): Promise<SelectJob[]> {
    try {
        return await db.select().from(jobs);
    } catch (error) {
        const dbError = new DatabaseError("Failed to retrieve jobs", error);
        logError(dbError);
        throw dbError;
    }
}

// Retrieve a job by ID
export async function getJobById(jobId: number): Promise<SelectJob | null> {
    try {
        const job = await db.select().from(jobs).where(eq(jobs.id, jobId)).limit(1);
        return job.length ? job[0] : null;
    } catch (error) {
        const dbError = new DatabaseError("Failed to retrieve job by ID", error);
        logError(dbError);
        throw dbError;
    }
}

// Update a job by ID
export async function updateJobById(jobId: number, jobData: Partial<InsertJob>): Promise<void> {
    if (!jobData) throw new Error("Invalid job data");
    try {
        await db.update(jobs).set(jobData).where(eq(jobs.id, jobId));
    } catch (error) {
        const dbError = new DatabaseError("Failed to update job", error);
        logError(dbError);
        throw dbError;
    }
}

// Delete a job by ID
export async function deleteJobById(jobId: number): Promise<void> {
    try {
        await db.delete(jobs).where(eq(jobs.id, jobId));
    } catch (error) {
        const dbError = new DatabaseError("Failed to delete job", error);
        logError(dbError);
        throw dbError;
    }
}
// Create a new job extension
export async function createJobExtension(extensionData: InsertJobExtension): Promise<void> {
    if (!extensionData) throw new Error("Invalid job extension data");
    try {
        await db.insert(jobExtensions).values(extensionData);
    } catch (error) {
        const dbError = new DatabaseError("Failed to create job extension", error);
        logError(dbError);
        throw dbError;
    }
}

// Retrieve all job extensions
export async function getJobExtensions(): Promise<SelectJobExtension[]> {
    try {
        return await db.select().from(jobExtensions);
    } catch (error) {
        const dbError = new DatabaseError("Failed to retrieve job extensions", error);
        logError(dbError);
        throw dbError;
    }
}

// Retrieve job extensions by job ID
export async function getJobExtensionsByJobId(jobId: string): Promise<SelectJobExtension[]> {
    try {
        return await db.select().from(jobExtensions).where(eq(jobExtensions.jobId, jobId));
    } catch (error) {
        const dbError = new DatabaseError("Failed to retrieve job extensions by job ID", error);
        logError(dbError);
        throw dbError;
    }
}

// Update a job extension by ID
export async function updateJobExtensionById(
    extensionId: number,
    extensionData: Partial<InsertJobExtension>
): Promise<void> {
    if (!extensionData) throw new Error("Invalid job extension data");
    try {
        await db.update(jobExtensions).set(extensionData).where(eq(jobExtensions.id, extensionId));
    } catch (error) {
        const dbError = new DatabaseError("Failed to update job extension", error);
        logError(dbError);
        throw dbError;
    }
}

// Delete a job extension by ID
export async function deleteJobExtensionById(extensionId: number): Promise<void> {
    try {
        await db.delete(jobExtensions).where(eq(jobExtensions.id, extensionId));
    } catch (error) {
        const dbError = new DatabaseError("Failed to delete job extension", error);
        logError(dbError);
        throw dbError;
    }
}

// Additional functions for job highlights, highlight items, and apply options would follow a similar pattern

// Create a new job highlight
export async function createJobHighlight(highlightData: InsertJobHighlight): Promise<void> {
    if (!highlightData) throw new Error("Invalid job highlight data");
    try {
        await db.insert(jobHighlights).values(highlightData);
    } catch (error) {
        const dbError = new DatabaseError("Failed to create job highlight", error);
        logError(dbError);
        throw dbError;
    }
}

// Retrieve all job highlights
export async function getJobHighlights(): Promise<SelectJobHighlight[]> {
    try {
        return await db.select().from(jobHighlights);
    } catch (error) {
        const dbError = new DatabaseError("Failed to retrieve job highlights", error);
        logError(dbError);
        throw dbError;
    }
}

// Retrieve job highlights by job ID
export async function getJobHighlightsByJobId(jobId: string): Promise<SelectJobHighlight[]> {
    try {
        return await db.select().from(jobHighlights).where(eq(jobHighlights.jobId, jobId));
    } catch (error) {
        const dbError = new DatabaseError("Failed to retrieve job highlights by job ID", error);
        logError(dbError);
        throw dbError;
    }
}

// Update a job highlight by ID
export async function updateJobHighlightById(
    highlightId: number,
    highlightData: Partial<InsertJobHighlight>
): Promise<void> {
    if (!highlightData) throw new Error("Invalid job highlight data");
    try {
        await db.update(jobHighlights).set(highlightData).where(eq(jobHighlights.id, highlightId));
    } catch (error) {
        const dbError = new DatabaseError("Failed to update job highlight", error);
        logError(dbError);
        throw dbError;
    }
}

// Delete a job highlight by ID
export async function deleteJobHighlightById(highlightId: number): Promise<void> {
    try {
        await db.delete(jobHighlights).where(eq(jobHighlights.id, highlightId));
    } catch (error) {
        const dbError = new DatabaseError("Failed to delete job highlight", error);
        logError(dbError);
        throw dbError;
    }
}

// Create a new highlight item
export async function createHighlightItem(itemData: InsertHighlightItem): Promise<void> {
    if (!itemData) throw new Error("Invalid highlight item data");
    try {
        await db.insert(highlightItems).values(itemData);
    } catch (error) {
        const dbError = new DatabaseError("Failed to create highlight item", error);
        logError(dbError);
        throw dbError;
    }
}

// Retrieve all highlight items
export async function getHighlightItems(): Promise<SelectHighlightItem[]> {
    try {
        return await db.select().from(highlightItems);
    } catch (error) {
        const dbError = new DatabaseError("Failed to retrieve highlight items", error);
        logError(dbError);
        throw dbError;
    }
}

// Retrieve highlight items by highlight ID
export async function getHighlightItemsByHighlightId(
    highlightId: string
): Promise<SelectHighlightItem[]> {
    try {
        return await db
            .select()
            .from(highlightItems)
            .where(eq(highlightItems.highlightId, highlightId));
    } catch (error) {
        const dbError = new DatabaseError(
            "Failed to retrieve highlight items by highlight ID",
            error
        );
        logError(dbError);
        throw dbError;
    }
}

// Update a highlight item by ID
export async function updateHighlightItemById(
    itemId: number,
    itemData: Partial<InsertHighlightItem>
): Promise<void> {
    if (!itemData) throw new Error("Invalid highlight item data");
    try {
        await db.update(highlightItems).set(itemData).where(eq(highlightItems.id, itemId));
    } catch (error) {
        const dbError = new DatabaseError("Failed to update highlight item", error);
        logError(dbError);
        throw dbError;
    }
}

// Delete a highlight item by ID
export async function deleteHighlightItemById(itemId: number): Promise<void> {
    try {
        await db.delete(highlightItems).where(eq(highlightItems.id, itemId));
    } catch (error) {
        const dbError = new DatabaseError("Failed to delete highlight item", error);
        logError(dbError);
        throw dbError;
    }
}

// Create a new apply option
export async function createApplyOption(optionData: InsertApplyOption): Promise<void> {
    if (!optionData) throw new Error("Invalid apply option data");
    try {
        await db.insert(applyOptions).values(optionData);
    } catch (error) {
        const dbError = new DatabaseError("Failed to create apply option", error);
        logError(dbError);
        throw dbError;
    }
}

// Retrieve all apply options
export async function getApplyOptions(): Promise<SelectApplyOption[]> {
    try {
        return await db.select().from(applyOptions);
    } catch (error) {
        const dbError = new DatabaseError("Failed to retrieve apply options", error);
        logError(dbError);
        throw dbError;
    }
}

// Retrieve apply options by job ID
export async function getApplyOptionsByJobId(jobId: string): Promise<SelectApplyOption[]> {
    try {
        return await db.select().from(applyOptions).where(eq(applyOptions.jobId, jobId));
    } catch (error) {
        const dbError = new DatabaseError("Failed to retrieve apply options by job ID", error);
        logError(dbError);
        throw dbError;
    }
}

// Update an apply option by ID
export async function updateApplyOptionById(
    optionId: number,
    optionData: Partial<InsertApplyOption>
): Promise<void> {
    if (!optionData) throw new Error("Invalid apply option data");
    try {
        await db.update(applyOptions).set(optionData).where(eq(applyOptions.id, optionId));
    } catch (error) {
        const dbError = new DatabaseError("Failed to update apply option", error);
        logError(dbError);
        throw dbError;
    }
}

// Delete an apply option by ID
export async function deleteApplyOptionById(optionId: number): Promise<void> {
    try {
        await db.delete(applyOptions).where(eq(applyOptions.id, optionId));
    } catch (error) {
        const dbError = new DatabaseError("Failed to delete apply option", error);
        logError(dbError);
        throw dbError;
    }
}
