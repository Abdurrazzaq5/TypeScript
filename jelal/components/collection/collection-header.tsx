import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export default function CollectionHeader() {
    return(
        <div className="flex flex-col items-center justify-center gap-6 text-center">
                    <div className="capitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Your Summaries{' '}
                        <span className="relative inine-block">
                            <span className="relative z-10 px-2">
                                Right Here    
                            </span>   
                            <span className="absolute inset-0 bg-blue-200/50 -rotate-2 rounded-lg 
                            transform -skew-y-1" aria-hidden="true">    
                            </span> 
                        </span>{' '}
                    </div>
                    <div>
                        <p className="mt-2 text-lg leadig-8 text-gray-600 max-w-2xl text-center">Revisit or Manage Your Summaries!</p>
                    </div>
                </div>
    )
}