Smart contract dans contracts/
Les tests dans test/
Et les scripts de déploiement et mint sans scripts/

gît clone https://github.com/quentin-abei/soul_bound_nft

cd soul_bound_nft

npm install 

touch .env

code .

dans .env ajoute ton URL qui pointe vers Goerli ( alchemy , infura etc..)sous le nom GOERLI_URL,
et ta clé privée metamask sous le nom PRIVATE_KEY

ensuite lance le scripts de déploiement sur Goerli , lance le script de mint .
Essaie de minter avec un autre compte autre que ton compte de déploiement ( est-ce que tu y arrives ? ) 
regarde ton nft sur opensea 

Essaie de l'envoyer à une autre addresse ( est-ce que tu y arrives ? ) 

burn en l'envoyant a l'adresse 0 .

Est-ce que tu comprends le principe du soulBound maintenant ? 

essaie de rejeter l'accès à ton smart contract si une addresse ne possède pas de nft .....