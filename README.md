# dElect  
### Decentralized Election System

Using blockchain, voting process can be made more secure, transparent, immutable, and reliable. This project is a decentralized election system that uses blockchain to store the votes and smart contracts to verify the votes.

Tech Used : React, TailwindCSS, HTML, Solidity, Web3, ethers.js.
 
To run the project , you need to have node installed (and git as well).
  
After installing node run the following commands :
<br><code>
  git clone https://github.com/Shubham-Rasal/dElect.git 
  </code><br>
  <code>
  cd dElect
</code><br>
  <code>
  npm install <br>
  npm run dev 
  </code>


<p>


## The Smart Contract

The smart contract consists of mainly 3 parts:
1. The Voter and its functions
2. The Candidate and its functions
3. The Admin and its functions

# Voter

The voter is the person who is voting. The voter has the following properties:
1. name : The name of the voter
2. id : The id of the voter
3. voted : A boolean value that tells whether the voter has voted or not
4. voterAddres : The address of the voter
5. vote() : A function that allows the voter to vote for a candidate

# Candidate

The candidate is the person who is running for the election. The candidate has the following properties:
1. name : The name of the candidate
2. id : The id of the candidate
3. voteCount : The number of votes the candidate has received
4. isStanding : A boolean value that tells whether the candidate is standing for the election or not


# Admin

The admin is the person who is running the election. The admin has the following properties:
1. name : The name of the admin
2. id : The id of the admin
3. createElect() : A function that allows the admin to create an election
4. approveApplicant() : A function that allows the admin to approve the applicant


## The Frontend

The frontend is made using React and TailwindCSS. The frontend consists of mainly 3 parts:

1. The Landing Page which asks the user to connect their wallet
2. The Dashboard which shows the user the list of elections
3. The Candidate Portal which allows the user to see if they are a candidate and if they are, they can see the results of the election they are running for
4. The Admin Portal which allows the user to see if they are an admin and if they are, they can see the list of applicants and approve them


</p>

## How to compile the smart contract

To compile the smart contract, you need to go to the website called [Remix](https://remix.ethereum.org/). After going to the website, you need to create a new file and paste the code of the smart contract in it. After that, you need to compile the smart contract and deploy it on the blockchain. After deploying the smart contract, you need to copy the address of the smart contract and paste it in the frontend code in the file called [GlobalContext.js](https://github.com/Shubham-Rasal/dElect/blob/master/src/GlobalContext.jsx). After that, you need to copy the ABI of the smart contract and paste it in the frontend code in the file called [abi.json](https://github.com/Shubham-Rasal/dElect/blob/master/src/artifacts/abi.json) present in abi folder. After that, you need to run the frontend code and you are good to go.
