import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { X } from 'lucide-react'

interface BuyerProfileModalProps {
  isOpen: boolean
  closeModal: () => void
  buyer: {
    name: string
    photo: string
    company: string
    industry: string
    budget: string
    riskTolerance: string
    leadershipStyle: string
    collaborationStyle: string
    keyStrengths: string[]
    acquisitionHistory: string
    financialCapabilities: string
    strategicFit: string
  }
}

export default function BuyerProfileModal({ isOpen, closeModal, buyer }: BuyerProfileModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                >
                  <span>{buyer.name} - Full Profile</span>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={closeModal}
                  >
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </Dialog.Title>
                <div className="mt-2">
                  <div className="flex items-center mb-4">
                    <img
                      src={buyer.photo}
                      alt={buyer.name}
                      className="w-24 h-24 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="text-xl font-semibold">{buyer.company}</h4>
                      <p className="text-gray-600">{buyer.industry}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold">Budget Range</h5>
                      <p>{buyer.budget}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold">Risk Tolerance</h5>
                      <p>{buyer.riskTolerance}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold">Leadership Style</h5>
                      <p>{buyer.leadershipStyle}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold">Collaboration Style</h5>
                      <p>{buyer.collaborationStyle}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h5 className="font-semibold">Key Strengths</h5>
                    <ul className="list-disc list-inside">
                      {buyer.keyStrengths.map((strength, index) => (
                        <li key={index}>{strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4">
                    <h5 className="font-semibold">Acquisition History</h5>
                    <p>{buyer.acquisitionHistory}</p>
                  </div>
                  <div className="mt-4">
                    <h5 className="font-semibold">Financial Capabilities</h5>
                    <p>{buyer.financialCapabilities}</p>
                  </div>
                  <div className="mt-4">
                    <h5 className="font-semibold">Strategic Fit</h5>
                    <p>{buyer.strategicFit}</p>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

