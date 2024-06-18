import axios from "axios"

const baseUrl = "http://localhost:8080/api";
let token: string;
let id: string;

beforeAll(async () => {
    const { data } = await axios.post(`${baseUrl}/user/login`, { password: "userAdmin", username: "userAdmin" });
    token = data.token
});



const viewErrors = (err: any) => {err.response.data.errors.errors.map((v:any,i:number)=>console.log(v,i))}

const removeAll = async(token: string) => {
    const { data } = await axios.get(`${baseUrl}/category`, {headers: { token }});
    data.map(async(v:any) => await axios.delete(`${baseUrl}/category/${v._id}`, {headers: {token}}))
}



describe('TEST API CATEGORY', () => {

    describe('ROUTE CREATE CATEGORY', () => {
        test('expect error for empty data', () => {
            return axios.post(`${baseUrl}/category`, {}, { headers: { token } })
            .then(v => expect(v).toBe(false))
            .catch( err => {
                const errors = err.response.data.errors.errors;

                expect(errors[0].msg).toBe("name is required") 
                expect(errors[1].msg).toBe("type is required") 
                expect(errors[2].msg).toBe("not valid type") 
            })
        })

        test('expect error for long length data', () => {
            return axios.post(`${baseUrl}/category`, {
                name: "nametolongveryveryveryvery",
                type: "typetolongveryveryveryvery",
            }, { headers: { token } })
            .then(v => expect(v).toBe(false))
            .catch( err => {
                const errors = err.response.data.errors.errors;

                expect(errors[0].msg).toBe("name max length 24") 
                expect(errors[1].msg).toBe("type max length 24") 
                expect(errors[2].msg).toBe("not valid type") 
            })
        })

        test('expect create category', () => {
            return axios.post(`${baseUrl}/category`, {
                name: "aceite de girasol",
                type: "almacen",
            }, { headers: { token } }).then(({data}) => {
                expect(data.name).toBe("aceite de girasol");
                expect(data.type).toBe("almacen");

                id = data._id
            })
        })
    
        test('expect error for existent category and invalid type', () => {
            return axios.post(`${baseUrl}/category`, {
                name: "aceite de girasol",
                type: "aceite",
            }, { headers: { token } })
            .then(v => expect(v).toBe(false))
            .catch( err => {
                const errors = err.response.data.errors.errors;

                expect(errors[0].msg).toBe("already exist category");
                expect(errors[1].msg).toBe("not valid type");
            })
        })
    })




    describe('ROUTE GET CATEGORIES', () => {
        test('expect 2 category', () => {
            return axios.get(`${baseUrl}/category`, { headers: { token } }).then(({ data }) => expect(data.length).toBe(2) )
        })
    })




    describe('ROUTE EDIT CATEGORY', () => {
        test('expect errors edit category', () => {
            return axios.put(`${baseUrl}/category/412411515`,{
                name: "aceite de oliva",
                type: "aceite",
                subcategories: [241, {hola:12412}, { name: "Gaseosa", brands: [] }]
            }, { headers: { token } })
            .then(v => expect(v).toBe(false))
            .catch((err:any) => {
                const errors = err.response.data.errors.errors;

                expect(errors[0].msg).toBe("id invalid");
                expect(errors[1].msg).toBe("not exist category with this id");
                expect(errors[2].msg).toBe("already exist category");
                expect(errors[3].msg).toBe("not valid type");
                expect(errors[4].msg).toBe("subcategories content item not object valid");
            })
        })

        test('expect edit category', () => {
            return axios.put(`${baseUrl}/category/${id}`,{
                name: "aceite",
                type: "almacen",
                subcategories: [{ name: "aceite de girasol", brands: ["Solcito", "Natura", "Cocinero"] }]
            }, { headers: { token } })
            .then(({data}) => {
                expect(data.name).toBe("aceite");
                expect(data.type).toBe("almacen");
                expect( data.subcategories[0].name ).toBe("aceite de girasol");
                expect( data.subcategories[0].brands ).toStrictEqual(["solcito", "natura", "cocinero"]);
            })
        })
        
        test('expect delete brands', () => {
            return axios.put(`${baseUrl}/category/${id}`,{
                subcategories: [{ name: "aceite de girasol", brands: ["Solcito", "Cocinero"] }]
            }, { headers: { token } })
            .then(({data}) => {
                expect( data.subcategories[0].name ).toBe("aceite de girasol");
                expect( data.subcategories[0].brands ).toStrictEqual(["solcito", "cocinero"]);
            })
        })
    })




    describe('ROUTE DELETE CATEGORY', () => {
        test('expect error by invalid id category', () => {
            return axios.delete(`${baseUrl}/category/512521515`, { headers: { token } })
            .then(v => expect(v).toBe(false))
            .catch((err:any) =>{ expect(err.response.status).toBe(400) })
        })

        test('expect delete category', () => {
            return axios.delete(`${baseUrl}/category/${id}`, { headers: { token } }).then((resp) =>{
                expect(resp.status).toBe(200)
            })
        })

        test('expect 1 category', () => {
            return axios.get(`${baseUrl}/category`, { headers: { token } }).then(({ data }) =>{
                expect(data.length).toBe(1)
            })
        })
    })
});