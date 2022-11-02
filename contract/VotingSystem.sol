// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.5.1;

contract VotingSystem
{
    //create admins with their functions
    //create an admin struct
    //create a election struct with candidates,starttime, duration, results
    //create candidate struct 

    // create voter struct
    //mapping for voters 
    


    struct Voter{
        uint256 id;
        string name;
        string des;
        string country;
        address voterAddress;
        mapping(uint256 => bool)  hasVoted;
    }

    struct Candidate{
        uint id;
        string name;
        mapping(string => bool) isStanding;
        mapping(string => uint) votes;
        
    }
     enum Status{ Approved , Pending , NotApplied }
         
     struct Applicant{
            uint id;
            string name;
            address applicantAddress;
            uint256 electionId;
            Status appStatus;
            

    } 
    

    struct Election{
        address admin;
        string name;
        uint256 id;
        uint256 startTime;
        uint256 duration;
        uint candidateCount;
        uint applicantCount;
        //mapping the election id with the candidate
        mapping(uint => Candidate)  candidates;   
        mapping(uint => Applicant)  applicants;    
        uint256 winner;             

    }


    struct Admin{
        uint id;
        string name;
        address adminAddress;
    }

    //mappings of various objects
    uint256 public voterCount;
    mapping(address => Voter) public voters;

    uint256 public adminCount;
    mapping(address=>Admin) public admins;

    uint public electionCount;
    mapping(uint256 => Election) public elections;

    //testing candidates and applicants
    

    //events declaration 
    event ElectionCreation(
        string _electionName,
        uint256 _startTime,
        uint256 _duration

    );

    event newCandidate(
        string message,
        uint256 count,
        uint256 eid,
        uint256 aid
    );

   

    //modifiers
    modifier onlyAdmin(){
        require(msg.sender == admins[msg.sender].adminAddress,"Not an admin");
        _;
    }

    modifier onlyVoter(){
        require(msg.sender == voters[msg.sender].voterAddress,"Not a voter");
        _;
    }


     constructor() public{
        addAdmin("Owner of Contract and default admin");
        createElection("test election",block.timestamp,1000);
        addVoter("admin voter",323,"Student");

    }

   


    function addAdmin(string memory _adminName) public{
        adminCount++;
        admins[msg.sender] = Admin(adminCount,_adminName,msg.sender);
    }

    //admin methods and privileges
    //create an election - add candidates from candidates mapping
    //approve candidates

       
    
    function createElection(string memory _name,uint256 _start,uint256 _duration) onlyAdmin public {
        electionCount+=1;
        elections[electionCount] = Election({
            admin:msg.sender,
            name:_name,
            id:electionCount,
            startTime:_start,
            duration:_duration,
            candidateCount:0,
            applicantCount:0,
            winner:0
        });
        emit ElectionCreation(_name, _start ,_duration);
    }
   
    //get candidate for particular election
    function getCandidate(uint256 _electionId , uint256 _candidateId) public view returns(string memory name){
        require(_candidateId <= elections[_electionId].candidateCount,"CandidateId Out of Bound.");
        return(elections[_electionId].candidates[_candidateId].name);
    } 

    //get applicant
    function getApplicant(uint256 _electionId , uint256 _applicantId) public view returns(string memory name, string memory status, address add , uint256 applicantId){
        require(_applicantId <= elections[_electionId].applicantCount,"ApplicantId Out of Bound.");
        if(elections[_electionId].applicants[_applicantId].appStatus == Status.Pending){
            status = "Pending";
        }
        if(elections[_electionId].applicants[_applicantId].appStatus == Status.Approved){
            status = "Approved";
        }
        
        name = elections[_electionId].applicants[_applicantId].name;
        add = elections[_electionId].applicants[_applicantId].applicantAddress;
        applicantId = elections[_electionId].applicants[_applicantId].id;
       
        return(  name ,status , add , applicantId );
    } 

    


    


    Candidate candidate;
    function approveApplicant( uint _applicantId , uint256 _electionId) onlyAdmin public{

        require(msg.sender == elections[_electionId].admin,"Admin, but not of this election!!");
       
        elections[_electionId].applicants[_applicantId].appStatus = Status.Approved;
        candidate.name = elections[_electionId].applicants[_applicantId].name;
        candidate.id = _applicantId;
        candidate.isStanding[elections[_electionId].name] = true;
        //todo : check if approved candidates exist
        
        elections[_electionId].candidateCount+=1;
        elections[_electionId].candidates[elections[_electionId].candidateCount] = candidate;

        emit newCandidate("new candidate added", elections[_electionId].candidateCount , _electionId , _applicantId);


    }


    //voter function and privileges
    //voters can : vote obviously , register , see result

    function addVoter(string memory _name,uint256 _id,string memory _type) public{
       voterCount+=1;
        voters[msg.sender] = Voter({
            name:_name,
            id:_id,
            country:"India",
            des:_type,
            voterAddress:msg.sender
        });
    }

    function vote(uint256  _electionId,uint256 _candidateId) onlyVoter  public{

        require(block.timestamp <= elections[_electionId].startTime + elections[_electionId].duration ,"Election is not started yet or is finished");
        //add has voted , update election , 
        require(voters[msg.sender].hasVoted[_electionId] == false,"Already voted for this election");
        voters[msg.sender].hasVoted[_electionId] = true;
        elections[_electionId].candidates[_candidateId].votes[elections[_electionId].name]+=1;
        updateWinner(_electionId);
        
    }



    //function to check if already voted
    function hasVoted(uint256 _electionId) public view onlyVoter returns(bool) {
        return(voters[msg.sender].hasVoted[_electionId]);
    }

    function updateWinner(uint256 _electionId) internal{
        uint i;
        string memory name = elections[_electionId].name;
        uint win = elections[_electionId].winner;
        uint l = elections[_electionId].candidateCount;//length to iterate
        for(i=0;i<l;i++){
            if(elections[_electionId].candidates[i].votes[name] >= elections[_electionId].candidates[win].votes[name]){
               elections[_electionId].winner = i;
            }

        }

    }

    

    function getWinner(uint256 _electionId) public view  returns(string memory){
        require
        (block.timestamp >=  elections[_electionId].startTime + elections[_electionId].duration,
        "Election is not started yet or is finished");
        return elections[_electionId].candidates[elections[_electionId].winner].name;

    }

    //candidate actions and usages
    //should be a voter 
    //✅able to apply for a election available
    //able to see if application if approved or not 
    //able to see results of elections
    Applicant applicant;
    function applyForPost(uint256 _electionId , string memory _name) public onlyVoter {
          uint  count = elections[_electionId].applicantCount;
         applicant.name =_name;
         applicant.id = count;
         applicant.electionId = _electionId;
         applicant.appStatus = Status.Pending;
         applicant.applicantAddress = msg.sender; 
         elections[_electionId].applicants[count] = applicant;
         elections[_electionId].applicantCount+=1;

    } 


}