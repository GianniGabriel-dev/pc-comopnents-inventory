export const getHomePage =(req, res)=>{
    res.render("home", { 
        title:"Home Page"
    })
}