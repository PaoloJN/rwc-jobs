import React from "react";
import JobCardItem from "./job-item";

interface JobList {
    list: any;
}

export default function JobList({ list }: JobList) {
    if (!list.length) {
        return (
            <div className="flex items-center justify-center py-16 text-muted-foreground">
                <span>No resources found.</span>
            </div>
        );
    }
    return (
        <ul className="space-y-0.5 py-2 xl:py-4 w-full">
            {list.map((item) => (
                <li key={item.id}>
                    <JobCardItem item={item} />
                </li>
            ))}
        </ul>
    );
}
