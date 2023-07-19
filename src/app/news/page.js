import News from "../components/news";
import Sidebar from "../components/sidebar";
import Image from "next/image";
import { SparklesIcon } from "@heroicons/react/outline";
import Link from "next/link";


export default async function NewsPage (){
    const newsResults = await fetch(
        "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json"
      ).then((res) => res.json());
     
   
    return ( 
      <>
      <div className="">
       <div className="flex  py-2 px-3 sticky top-0 z-40 bg-gray-100 border-b border-gray-200 justify-center">
        <div>
          <Link href="/">
          <Image
            width="50"
            height="50"
            src="https://logodix.com/logo/989957.png"
            alt="img"
            className="visible sm:hidden cursor-pointer"
          ></Image>
          </Link>
        </div>
      </div>
      <div className="flex">
      <Sidebar />
        <div className="text-gray-700 space-y-3 bg-gray-100 pt-2 w-[90%] xl:w-[75%] xl:ml-[370px] w-full">
          
        <h4 className="font-bold text-xl px-4">Whats happening?</h4>
        <>
          {newsResults.articles.map((article) => (
            <div
              key={article.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <News key={article.title} article={article} />
            </div>
          ))}
        </>
        <button
         
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
        >
          Show more
        </button>
      </div>
      </div>
      </div>
      </>
      
     );
}