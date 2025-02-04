import Layout from '@/components/layout'
import BuyersList from '@/components/buyers-list'

export default function BuyersPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <BuyersList />
      </div>
    </Layout>
  )
}

