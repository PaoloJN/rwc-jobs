"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTagParams } from "@/lib/hooks/use-tag-params";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import React from "react";
import { cn } from "@/lib/utils";
import {
    BookOpenCheckIcon,
    BriefcaseBusinessIcon,
    BriefcaseMedicalIcon,
    CalendarCheck2Icon,
    ClockIcon,
    DollarSignIcon,
    HospitalIcon,
} from "lucide-react";

interface JobItemProps {
    item: any;
}

export function formatDate(input: string | number | Date): string {
    return new Date(input).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

const iconMapping = {
    posted_at: ClockIcon,
    // salary: DollarSignIcon,
    schedule_type: BriefcaseBusinessIcon,
    qualifications: BookOpenCheckIcon,
    dental_coverage: HospitalIcon,
    health_insurance: BriefcaseMedicalIcon,
    paid_time_off: CalendarCheck2Icon,
};

export default function JobCardItem({ item }: JobItemProps) {
    const params = useParams<{ id: string }>();
    const tag = useTagParams();

    return (
        <Link
            className={cn(
                "inline-flex size-full flex-col space-y-1 rounded-md p-2 text-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring xl:p-3 w-full"
                // params.id === item.id && "bg-accent"
            )}
            href={tag ? `/job/${item.id}?${new URLSearchParams({ tag })}` : `/job/${item.id}`}
            prefetch
        >
            <div className="flex items-start">
                <div className="flex flex-col items-center mr-4 gap-2">
                    <Avatar className="w-8 h-8 rounded-md">
                        <AvatarImage src={item.thumbnail} alt="Company Logo" />
                        <AvatarFallback className="rounded-md">
                            {item.company_name[0]}
                        </AvatarFallback>
                    </Avatar>

                    {item.detected_extensions?.posted_at &&
                        isNewPosting(item.detected_extensions.posted_at) && (
                            <div className="w-fit border px-1 rounded-sm text-xs">New</div>
                        )}
                </div>

                <div>
                    <div className="flex flex-col text-xs gap-1">
                        <span className="font-semibold text-sm">{item.title}</span>
                        <span>{item.company_name}</span>
                        <span className="text-muted-foreground">
                            {item.location} • via {item.via}
                        </span>
                    </div>
                    <div className="flex items-center mt-2  text-xs text-muted-foreground flex-wrap gap-2">
                        {item.extensions.map((extension, index) => {
                            const key = Object.keys(item.detected_extensions)[index];
                            const IconComponent = iconMapping[key];

                            return (
                                <span key={index} className="flex items-center gap-1.5">
                                    {IconComponent && <IconComponent className="w-3 h-3" />}
                                    <span className="text-[12px]">{extension}</span>
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Link>
    );
}

function isNewPosting(postedAt: string): boolean {
    const match = postedAt.match(/(\d+)\s*(hour|day|week|month|year)s?\s*ago/);
    if (match) {
        const value = parseInt(match[1], 10);
        const unit = match[2];
        const now = new Date();
        let postedDate;

        switch (unit) {
            case "hour":
                postedDate = new Date(now.getTime() - value * 60 * 60 * 1000);
                break;
            case "day":
                postedDate = new Date(now.getTime() - value * 24 * 60 * 60 * 1000);
                break;
            case "week":
                postedDate = new Date(now.getTime() - value * 7 * 24 * 60 * 60 * 1000);
                break;
            case "month":
                postedDate = new Date(now.setMonth(now.getMonth() - value));
                break;
            case "year":
                postedDate = new Date(now.setFullYear(now.getFullYear() - value));
                break;
            default:
                return false;
        }

        return now.getTime() - postedDate.getTime() < 24 * 60 * 60 * 1000;
    }
    return false;
}
