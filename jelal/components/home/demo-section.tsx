import { SquareBottomDashedScissors } from "lucide-react";

export default function DemoSection() {
    return (
        <section>
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
            </div>
            <div className="flex flex-col items-center text-center spay-y-4 mb-16">
                <div className="inline-flex items-center justify-center p-2 rounded-2xl 
                bg-gray-100/80 backdrop-blur-xs border border-gray-500/20 mb-4">
                    <SquareBottomDashedScissors className="w-6 h-6 text-blue-500"/>
                </div>
                <h3 className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6">
                    Watch how Jelal transforms{' '} 
                    <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                        this Next.js course PDF 
                    </span>{' '}
                    into an easy-to-read summary!
                </h3>              
            </div>

            <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6">
                {/* <Button>Watch Demo</Button> */}
            </div>
        </section>
    )
}