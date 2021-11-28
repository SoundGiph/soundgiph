import { createServer } from 'http';

var httpServer = createServer(function(req,res){

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Content-Type', 'application/json');
    
    res.end(JSON.stringify(fetchAll()));
});

httpServer.listen(8080, () => {
    console.log("Serving http")
})

const fetchAll = () => {
    var response = [
        {sound: "AlkpotePute.mp3", image: "AlkpotePute.png"},
        {sound: "Madrane_-_Negro_vnr_(Niska_-_Freestyle_PSG).mp3", image: "AlkpotePute.png"},
        {sound: "SCH_-__Contre-sens_(Bande_organisee).mp3", image: "AlkpotePute.png"},
    ]

    return response
}
