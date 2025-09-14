import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 
        sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl">
            <div className="">
                <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r
                from-blue-200 via-blue-500 to-blue-800 animate-gradient-x group">
                    <Badge variant={'secondary'} 
                        className="relative px-6 py-2 text-base font-medium bg-white 
                    rounded-full group-hover:bg-gray-50 transition-colors duration-200">
                        <Sparkles className="h-6 w-6 mr-2 text-blue-600 animate-pulse"/>
                        <p className="text-base text-blue-600">AI-Driven Clarity</p>
                    </Badge>
                    </div>
                </div>
                <h1 className="font-bold py-6 text-center">Turn a Confusing Corporate Paper into a<br />
                    <span className="relative inine-block">
                        <span className="relative z-10 px-2">
                            Clear    
                        </span>   
                        <span className="absolute inset-0 bg-blue-200/50 -rotate-2 rounded-lg 
                        transform -skew-y-1" aria-hidden="true">    
                        </span> 
                    </span>{' '}
                    Summary in Seconds</h1>
                <h2 className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px--0 lg:max-w-4xl 
                text-gray-500">Instantly distill a document into an easy-to-digest summary with synonym normalization.</h2>
                <div>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white mt-6 text-base sm:text-lg lg:text-xl 
                    rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16">
                        <Link href="/#pricing" className="flex gap-2 items-center">
                            <span>
                                Try Jelal
                            </span>
                            <ArrowRight className="animate-pulse"/>
                        </Link>
                    </Button>
                </div>
                
        </section>
    )
}