import { useSelector } from "react-redux";

const Statistics = () => {
    const annonces = useSelector(state=> state.annonces);
    const revenues_all = annonces.map(ann=> {
        ann.price*5/100;
    })
    const revenue = revenues_all.reduce((sum, price)=> sum+price,0);

    return (
        <div className="">
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap w-full mb-8">
                        <div className="w-full mb-6 lg:mb-0">
                            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Statistic</h1>
                            <div className="h-1 w-32 bg-orange-500 rounded"></div>
                        </div>
                    </div>
                    <div className="flex flex-wrap  text-center w-[75%] mx-auto">
                        <div className="p-4 sm:w-1/2 w-1/2">
                            <div className="bg-stone-500 rounded-lg p-2 xl:p-6">
                                <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">{annonces.length}</h2>
                                <p className="leading-relaxed text-gray-100 font-bold">Location</p>
                            </div>
                        </div>
                        <div className="p-4 sm:w-1/2 w-2/2">
                            <div className="bg-stone-500 rounded-lg p-2 xl:p-6">
                                <h2 className="title-font font-medium sm:text-4xl text-3xl text-white">{revenue}</h2>
                                <p className="leading-relaxed text-gray-100 font-bold">Revenues</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}
export default Statistics;