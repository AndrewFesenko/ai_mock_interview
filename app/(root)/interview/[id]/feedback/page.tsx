import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import {
    getFeedbackByInterviewId,
    getInterviewById,
} from "@/lib/actions/general.action";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Feedback = async ({ params }: RouteParams) => {
    const { id } = await params;
    const user = await getCurrentUser();

    const interview = await getInterviewById(id);
    if (!interview) redirect("/");

    const feedback = await getFeedbackByInterviewId({
        interviewId: id,
        userId: user?.id!,
    });

    return (
        <section className="max-w-4xl mx-auto py-8 px-4 md:px-8 space-y-8">
            {/* Header */}
            <div className="space-y-6">
                <h1 className="text-3xl md:text-4xl font-semibold text-center">
                    Feedback Summary -{" "}
                    <span className="capitalize text-primary-200">{interview.role}</span> Interview
                </h1>

                <div className="flex flex-wrap justify-center gap-6">
                    {/* Overall Impression */}
                    <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 px-4 py-2 rounded-md">
                        {feedback?.totalScore && (
                            <Image src="/star.svg" width={22} height={22} alt="star" />
                        )}
                        <p>
                            Overall Impression:{" "}
                            <span className="text-primary-200 font-bold">
                                {feedback?.totalScore}
                            </span>
                            /100
                        </p>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 px-4 py-2 rounded-md">
                        {feedback?.createdAt && (
                            <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
                        )}
                        <p>
                            {feedback?.createdAt
                                ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                                : "N/A"}
                        </p>
                    </div>
                </div>
            </div>

            <hr className="border-gray-200 dark:border-gray-800" />

            {/* Final Assessment */}
            <div className="bg-black/5 dark:bg-white/5 p-6 rounded-xl space-y-4">
                <h2 className="text-xl font-semibold text-primary-200">Final Assessment</h2>
                <p className="leading-relaxed">{feedback?.finalAssessment}</p>
            </div>

            {/* Interview Breakdown */}
            <div className="bg-black/5 dark:bg-white/5 p-6 rounded-xl space-y-6">
                <h2 className="text-xl font-semibold text-primary-200">Breakdown of the Interview:</h2>
                <div className="space-y-6">
                    {feedback?.categoryScores?.map((category, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                                <p className="font-bold">
                                    {index + 1}. {category.name}
                                </p>
                                <span className="text-primary-200 font-bold">{category.score}/100</span>
                            </div>
                            <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2">
                                <div
                                    className="bg-primary-200 h-2 rounded-full"
                                    style={{ width: `${category.score}%` }}
                                ></div>
                            </div>
                            <p className="mt-2">{category.comment}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Strengths and Areas for Improvement */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div className="bg-black/5 dark:bg-white/5 p-6 rounded-xl space-y-4">
                    <h3 className="text-xl font-semibold text-primary-200">Strengths</h3>
                    {feedback?.strengths?.length > 0 ? (
                        <ul className="space-y-2 pl-5 list-disc marker:text-primary-200">
                            {feedback.strengths.map((strength, index) => (
                                <li key={index}>{strength}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">No strengths provided.</p>
                    )}
                </div>

                {/* Areas for Improvement */}
                <div className="bg-black/5 dark:bg-white/5 p-6 rounded-xl space-y-4">
                    <h3 className="text-xl font-semibold text-primary-200">Areas for Improvement</h3>
                    {feedback?.areasForImprovement?.length > 0 ? (
                        <ul className="space-y-2 pl-5 list-disc marker:text-primary-200">
                            {feedback.areasForImprovement.map((area, index) => (
                                <li key={index}>{area}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">No areas for improvement provided.</p>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 buttons">
                <Button className="btn-secondary flex-1">
                    <Link href="/" className="flex w-full justify-center">
                        <p className="text-sm font-semibold text-primary-200 text-center">
                            Back to dashboard
                        </p>
                    </Link>
                </Button>

                <Button className="btn-primary flex-1">
                    <Link
                        href={`/interview/${id}`}
                        className="flex w-full justify-center"
                    >
                        <p className="text-sm font-semibold text-black text-center">
                            Retake Interview
                        </p>
                    </Link>
                </Button>
            </div>
        </section>
    );
};

export default Feedback;