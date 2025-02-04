import { CheckCircle, Circle } from 'lucide-react'

const steps = [
  "NDA",
  "CIM",
  "Letter of Intent",
  "Due diligence",
  "Purchase agreement",
  "Deal completed"
]

const progressColor = "bg-green-500"

interface BuyerTimelineProps {
  currentStep: string;
  statusColors: {
    NDA: string;
    CIM: string;
    "Letter of Intent": string;
    "Due diligence": string;
    "Purchase agreement": string;
    "Deal completed": string;
  };
}

export function BuyerTimeline({ currentStep, statusColors }: BuyerTimelineProps) {
  const currentStepIndex = steps.indexOf(currentStep)

  return (
    <div className="mt-4">
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center">
            {index <= currentStepIndex ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <Circle className="w-6 h-6 text-gray-300" />
            )}
            <span className="text-xs mt-1 text-center">{step}</span>
          </div>
        ))}
      </div>
      <div className="relative">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200"></div>
        <div 
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 h-1 transition-all duration-500 ease-in-out ${progressColor}`}
          style={{ width: `${(currentStepIndex + 1) / steps.length * 100}%` }}
        ></div>
      </div>
    </div>
  )
}

