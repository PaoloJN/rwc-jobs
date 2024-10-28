import {
    createJob,
    createJobExtension,
    createJobHighlight,
    createHighlightItem,
    createApplyOption,
} from "./queries";

const jobsResults = [
    {
        title: "Full Stack Java Developer with AWS Certification",
        company_name: "Jobs via Dice",
        location: "Anywhere",
        via: "LinkedIn",
        share_link:
            "https://www.google.com/search?ibp=htl;jobs&q=Java+Developer&htidocid=K0MuZO33_ZCnkoG0AAAAAA%3D%3D&hl=en-US&shndl=-1&source=sh/x/job/li/m1/1#fpstate=tldetail&htivrt=jobs&htiq=Java+Developer&htidocid=K0MuZO33_ZCnkoG0AAAAAA%3D%3D",
        thumbnail:
            "https://serpapi.com/searches/671c987e5ddfba40b191c25c/images/15b07620409b25f83ff7b692dd8dfbb56a72774227f99f5fe80d1eb0b1e0d9d1.jpeg",
        extensions: ["14 hours ago", "Work from home", "Full-time", "No degree mentioned"],
        detected_extensions: {
            posted_at: "14 hours ago",
            work_from_home: true,
            schedule_type: "Full-time",
            qualifications: "No degree mentioned",
        },
        description:
            "Dice is the leading career destination for tech experts at every stage of their careers. Our client, Aloden, Inc., is seeking the following. Apply via Dice today! ...",
        job_highlights: [
            {
                title: "Qualifications",
                items: [
                    "4-6 years of hands on experience on below technologies",
                    "Java 8 /11, Spring boot framework and REST API/Kafka",
                    "AWS ( hands on experience)",
                    "Experience with distributed databases like AWS RDS databases",
                    "Strong/excellent communication skills",
                    "Must have certification Developer or Solutions Architect Level AWS Certification",
                    "React",
                    "Experience with any of these Observability tools: Splunk, Datadog, Dynatrace, or Grafana",
                ],
            },
        ],
        apply_options: [
            {
                title: "LinkedIn",
                link: "https://www.linkedin.com/jobs/view/full-stack-java-developer-with-aws-certification-at-jobs-via-dice-4058633893?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
            },
            {
                title: "Dice.com",
                link: "https://www.dice.com/job-detail/a21d16f4-e555-4ccc-80b6-f7a9bdea17ac?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
            },
            {
                title: "Jobilize",
                link: "https://www.jobilize.com/job/us-java-full-stack-developer-aws-diamondpick-hiring-now-job-immediately?utm_campaign=google_jobs_apply&utm_source=google_jobs_apply&utm_medium=organic",
            },
        ],
        job_id: "eyJqb2JfdGl0bGUiOiJGdWxsIFN0YWNrIEphdmEgRGV2ZWxvcGVyIHdpdGggQVdTIENlcnRpZmljYXRpb24iLCJjb21wYW55X25hbWUiOiJKb2JzIHZpYSBEaWNlIiwiYWRkcmVzc19jaXR5IjoiVW5pdGVkIFN0YXRlcyIsImh0aWRvY2lkIjoiSzBNdVpPMzNfWkNua29HMEFBQUFBQT09IiwiaGwiOiJlbiJ9",
    },
    // Add more job records as needed
];
async function seedData() {
    try {
        for (const job of jobsResults) {
            // Create job
            await createJob({
                jobId: job.job_id,
                title: job.title,
                companyName: job.company_name,
                location: job.location,
                via: job.via,
                shareLink: job.share_link,
                thumbnail: job.thumbnail,
                description: job.description,
            });

            // Create job extension
            await createJobExtension({
                jobId: job.job_id, // Use the ID from the created job record
                postedAt: job.detected_extensions.posted_at,
                workFromHome: job.detected_extensions.work_from_home,
                scheduleType: job.detected_extensions.schedule_type,
                qualifications: job.detected_extensions.qualifications,
            });

            // Create job highlights
            for (const highlight of job.job_highlights) {
                await createJobHighlight({
                    jobId: job.job_id,
                    title: highlight.title,
                });

                // Create highlight items
                for (const item of highlight.items) {
                    await createHighlightItem({
                        highlightId: job.job_id,
                        item,
                    });
                }
            }

            // Create apply options
            for (const option of job.apply_options) {
                await createApplyOption({
                    jobId: job.job_id,
                    title: option.title,
                    link: option.link,
                });
            }
        }

        console.log("Data seeded successfully!");
    } catch (err) {
        console.error("Error seeding data:", err);
    }
}

// Run the seed function
seedData();
