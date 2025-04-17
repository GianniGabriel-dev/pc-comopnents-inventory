export const getHomePage =(req, res)=>{
    res.render("home", { 
        title:"Home Page"
    })
}

export const getCreatePage =(req, res)=>{
    res.render("create-pc", { 
        title:"Create PC"
    })
}
export const postNewPc =(req, res)=>{
    const { name, cpu, gpu, ram, storage } = req.body;
    //falta enviar los datos a la base de datos
    console.log(`New PC Created: ${name}, CPU: ${cpu}, GPU: ${gpu}, RAM: ${ram}, Storage: ${storage}`);
    res.redirect("/");
}