class NetWorthCalculator {

    constructor(principal, APY, monthlyContribution, yearsToGrow){
        this.principal = principal;
        this.APY = APY;
        this.monthlyContribution = monthlyContribution;
        this.yearsToGrow = yearsToGrow;
        this.totalContributions = (this.monthlyContribution * 12) * this.yearsToGrow;
        this.endVal = this.compoundYears(); 
    }

    netWorthData = [];
    totalGains = 0;
    totalContributions; 

    // Balance at the end of the month given principal & monthly contribution
    compoundMonth(principal){
        let monthEnd = (principal + this.monthlyContribution) * (1 + (this.APY/12));
        return Math.floor(monthEnd)
    }

    // Balance at the end of the year given principal & monthly contribution
    compoundYear(principal){
        let yearEnd = principal;
        for (let i =0; i < 12; i++){ 
            let monthlyGain = this.compoundMonth(yearEnd) - yearEnd; // calculate
            yearEnd += monthlyGain; // add interest to principal
          }
          return Math.floor(yearEnd);
    }

    compoundYears(){
        // reset data
        this.netWorthData = [];
        this.endVal = 0;
        let timeEnd = this.principal;
        for(let i = 0; i < this.yearsToGrow; i++){
            let total = this.compoundYear(timeEnd);
            let yearIncrease = total - timeEnd;
            let yearGain = yearIncrease - (this.monthlyContribution * 12); // remove contributions from gains
            timeEnd += yearIncrease;
            this.totalGains += yearGain;
            this.netWorthData.push({ year: i+1, yearIncrease: yearIncrease, yearEnd: total, yearGain: yearGain});
        }
        return Math.floor(timeEnd);
    }


      
  }


  

