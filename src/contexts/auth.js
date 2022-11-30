import { useState, createContext, useEffect } from "react";
import firebase from  "../services/fireBaseConnections";

//criar o context 
export const AuthContext = createContext ({});


function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [LoadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        function loadStorage() {
            const storageUser = localStorage.getItem('SistemaUser');

            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            };

            setLoading(false);
        };

        loadStorage();
    }, []);

    //login
    async function signIn(email, password){
        setLoadingAuth(true);

        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;
        })

        .catch((error) => {
            setLoadingAuth(false);
        });
    }



    //cadastrando usuario
    async function signUp(nome, email, password){
        setLoadingAuth(true);
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;

            //cadastrar banco
            await firebase.firestore().collection('users').doc(uid).set({
                nome: nome,
                avatarUrl: null,
            })
            .then(() => {
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email,
                    avatarUrl: null,
                };

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
            });

        })

        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
        });
    }

    function storageUser(data){
        localStorage.setItem('SistemaUser', JSON.stringify(data));
    }

    //logout
    async function signOut(){
        await firebase.auth().signOut();
        localStorage.removeItem('SistemaUser');
        setUser(null);
    }

    
    return(
        <AuthContext.Provider value= {{ signed: !!user, user, loading, signUp, signOut }}>
            {children}
        </AuthContext.Provider>

        
    );
}

export default AuthProvider;
