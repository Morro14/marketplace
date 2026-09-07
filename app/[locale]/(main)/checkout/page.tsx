import CheckoutSummary from "@/src/components/checkout/CheckoutSummary";

export default async function Checkout() {
  return <div className="2xl:w-[954px] 2xl:min-h-200 flex 2xl:gap-8 bg-bg drop-shadow-lg px-8 py-4">
    <div className="bg-gray-light grow h-150">
    </div>
    <div className="w-px h-full bg-gray-light"></div>
    <div className="w-62 h-150">
      <CheckoutSummary></CheckoutSummary>
    </div>
  </div>
}
