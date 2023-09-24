import http, { IncomingMessage, ServerResponse } from "http"
import event from "events"

const port : number = 2005;

interface iData {
    id?: number;
    name?: string;
    phone?: number;
    stack?: string;
}

interface iMessage {
    message: string;
    success: boolean;
    data: null | {} | {}[]
}

let class08:iData[] = [
    {
        id: 1,
        name: "Jessica",
        phone: 9034526732,
        stack: "full-stack"
    },
    {
        id: 2,
        name: "Jemimah",
        phone: 98503456823,
        stack: "back-end"
    },
    {
        id: 3,
        name: "John",
        phone: 70948576234,
        stack: "half-stack"
    },
    {
        id: 4,
        name: "Luciana",
        phone: 9145628476,
        stack: "full-stack"
    },
    {
        id: 5,
        name: "Joanna",
        phone: 8076459034,
        stack: "full-stack"
    },
];

const server = http.createServer((req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.setHeader("Content-type", "Application/Json");
    const {method, url} = req;
    let status: number = 404;
    const response:iMessage={
        message: "failed",
        success: true,
        data: null
    };
    const Container: any = []
    req.on("data", (chunk:any)=>{
        Container.push(chunk)
    }).on("end", () => {
        if(url === "/" && method === "GET"){
            status = 200;
            response.message="All informations gotten";
            response.success= true;
            response.data= class08;
            res.write(JSON.stringify({response, status}));
            res.end();
        };
        if(url === "/" && method === "POST"){
            status = 201;
            const Body = JSON.parse(Container);
            class08.push(Body);
            response.message= "All added successfully";
            response.success = true;
            response.data= class08;
            res.write(JSON.stringify({response, status}));
            res.end()
        };
        if(method === "PATCH"){
            const build = JSON.parse(Container)

            let details: any = url?.split("/")[1];
            let datavalue = parseInt(details);

            let findObject = class08.some((el) =>{
                return el.id === datavalue;
            });
            if(findObject === false){
                status = 404;
                (response.message = "User not found"),
                (response.data = null),
                (response.success = false);

                res.write(JSON.stringify({response, status}));
                res.end();
            }else{
                const updateusername = build.name;
                const updateuserstack = build.stack;
                class08 = class08.map((user: any)=> {
                    if(user?.id === datavalue){
                        return{
                            id: user?.id,
                            name: updateusername,
                            stack: updateuserstack,
                        }
                    }
                    return user;
                });
                status = 200;
                (response.message = "user updated"),
                (response.data = class08),
                (response.success = true),
                res.write(JSON.stringify({response, status}));
                res.end()
            }
        }
        if(method === "PUT"){
            const build = JSON.parse(Container);

            let details: any = url?.split("/")[1];
            let datavalue = parseInt(details);

            let findObject = class08.some((el) => {
                return el.id === datavalue;})

                if (findObject === false){
                    status = 404;
                    (response.message = "User not found"),
                    (response.data = null),
                    (response.success = false);
                    res.write(JSON.stringify({status, response}))
                    res.end()
                } else {
                    const updateusername = build.name;
                    const updatestack = build.stack;

                    class08 = class08.map((user: any)=> {
                        if(user?.id === datavalue){
                            return{
                                id: user?.id,
                                name: updateusername,
                                stack: updatestack,
                            }
                        }
                        return user
                    });
                    status = 200,
                    (response.message = "user updated"),
                    (response.data = class08),
                    (response.success = true);
                    res.write(JSON.stringify({response, status}));
                    res.end();
                }
        };
        if(method === "DELETE"){
            const build = JSON.parse(Container);

            let datavalue : any = url?.split("/")[1];
            let details = parseInt(datavalue);

            let findObject = class08.some((el) => {
                return el.id === details
            })
            if(findObject === false){
            }else{
                class08 = class08.map((user: any) =>{
                    if(user?.id === details){
                        return{
                            id: user?.id
                        }
                    }
                    return user
                });
                (response.message = "user's infos deleted successfully"),
                (response.success = true),
                (response.data = class08),
                res.write(JSON.stringify({status, response}));
                res.end()
            }
        };
        })
    })

server.listen(port, () => {
    console.log("Listening to port", port)
});