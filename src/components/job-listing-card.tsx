import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Clock,
    Briefcase,
    GraduationCap,
    ChevronRight,
    ChevronDown,
    MoreHorizontal,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function JobListingCard({ item }: any) {
    return (
        <Card className="w-full max-w-xl bg-transparent text-foreground border-none shadow-none">
            <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8 rounded-md">
                            <AvatarImage src={item.thumbnail} alt="Company Logo" />
                            <AvatarFallback className="rounded-md">
                                {item.company_name[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-lg font-medium">{item.title}</CardTitle>
                            <p className="text-xs text-muted-foreground">
                                {item.company_name} • {item.location} • {item.via}
                            </p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-2 space-y-3">
                <div className="flex space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3" />
                        {item.extensions[0]}
                    </div>
                    <div className="flex items-center">
                        <Briefcase className="mr-1 h-3 w-3" />
                        {item.extensions[1]}
                    </div>
                    <div className="flex items-center">
                        <GraduationCap className="mr-1 h-3 w-3" />
                        {item.extensions[2]}
                    </div>
                </div>
                <ScrollArea className="w-full whitespace-nowrap">
                    <div className="flex space-x-2">
                        <Button
                            size="sm"
                            // className="bg-primary text-primary-foreground hover:bg-primary/90 font-normal rounded-full px-3 py-1 text-xs"
                        >
                            Apply on Indeed Jobs
                        </Button>
                        <Button
                            size="sm"
                            // className="bg-primary text-primary-foreground hover:bg-primary/90 font-normal rounded-full px-3 py-1 text-xs"
                        >
                            Apply on Rise AI Job Search
                        </Button>
                        <Button
                            size="sm"
                            // className="bg-primary text-primary-foreground hover:bg-primary/90 font-normal rounded-full px-3 py-1 text-xs"
                        >
                            Apply on Remote OK
                        </Button>
                        <Button variant="ghost" size="icon" className="text-primary">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </ScrollArea>
                <Separator />
                <div className="space-y-3">
                    <h3 className="text-sm font-medium">Job highlights</h3>
                    <p className="text-xs text-muted-foreground">
                        Identified by Google from the original job post
                    </p>
                    {item.job_highlights.map((highlight, index) => (
                        <div key={index} className="space-y-1">
                            <h4 className="text-sm font-medium">{highlight.title}</h4>
                            <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5">
                                {highlight.items.slice(0, 3).map((item, itemIndex) => (
                                    <li key={itemIndex}>{item}</li>
                                ))}
                            </ul>
                            {highlight.items.length > 3 && (
                                <p className="text-xs text-muted-foreground">
                                    {highlight.items.length - 3} more item(s)
                                </p>
                            )}
                        </div>
                    ))}
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-between text-primary hover:bg-transparent hover:text-primary"
                    >
                        More job highlights
                        <ChevronDown className="ml-2 h-3 w-3" />
                    </Button>
                </div>
                <Separator />
                <div>
                    <h3 className="text-sm font-medium mb-1">Job description</h3>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-between text-primary hover:bg-transparent hover:text-primary mt-2"
                    >
                        Show full description
                        <ChevronDown className="ml-2 h-3 w-3" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
