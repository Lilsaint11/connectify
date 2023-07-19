import Widgets from "./widgets";


 
export default async function WidgetsData (){
    const newsResults = await fetch(
        "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json"
      ).then((res) => res.json());
      const randomUsersResults = await fetch(
        "https://randomuser.me/api/?results=30&inc=name,login,picture"
      ).then((res) => res.json());
    return ( 
        <Widgets newsResults={newsResults.articles} randomUsersResults={randomUsersResults.results} />
     );
}
 
