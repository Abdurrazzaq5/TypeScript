import { Divide } from "lucide-react";
import { ReactNode} from "react";
import { Upload } from "lucide-react";
import { ScanText } from "lucide-react";
import { FileText } from "lucide-react";

type Step = {
    icon: ReactNode;
    label: string;
    description: string;
};

const steps: Step[] = [
    {
        icon: <Upload size={64} strokeWidth={1.5}/>,
        label: 'Upload your PDF',
        description: 'Simply drag and drop your PDF document or click to upload',
    },
    {
        icon: <ScanText size={64} strokeWidth={1.5}/>,
        label: 'AI Analysis',
        description: 'Our advanced AI processes and analyses your document instantly'
    },
    {
        icon: <FileText size={64} strokeWidth={1.5}/>,
        label: 'Get Summary',
        description: 'Receive a clear, concise summary of your document'
    }
];

export default function HowItWorksSection() {
    return (
        <section className="relative overflow-hidden bg-gray-50">
            <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 transform-gpu 
                    overflow-hidden blur-3xl">
                        <div className="absolute left-1/2 top-1/2 aspect-1155/678 w-[36.125rem] -translate-x-1/2 -translate-y-1/2
                        bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30 
                        sm:w-[72.1875rem]" 
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 76.7%, 0.1% 64.9% 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                    <div className="text-center mb-16">
                        <h2 className="font-bold text-xl uppercase mb-4 text-blue-500">How it works</h2>
                        <h3 className="font-bold text-3xl max-w-2xl mx-auto">
                            Follow these three steps to get your summary
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
                        {steps.map((step, idx) => (
                            <StepItem key={idx} {...step}/>
                        ))}
                    </div>   
            </div>
        </section>
    )
}

function StepItem({icon, label, description} : Step) {
    return (<div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xs 
    border border-white/10 hover:border-blue-500/50 transition-colors group w-full">
        <div className="flex flex-col gap-4 h-full">
            <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-2xl 
            bg-linear-to-br from-blue-500/10 to-transparent group-hover:from-blue-500/20 transition-colors">
                <div className="text-blue-500">
                    {icon}
                </div>
            </div> 
            <div className="flex flex-col flex-1 gap-1 justify-hidden">
                <h4 className="text-center font-bold text-xl">{label}</h4>
                <p className="text-center text-gray-600 text-sm">{description}</p>
            </div>              
        </div>   
    </div>)
}