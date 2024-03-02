class Pagina {
  
    currentpage: string;
    nextpage: string;
    previouspage: string;
    totalpage :string;

    constructor( currentpage: string, nextpage: string, previouspage: string,totalpage:string) {
        
        this.currentpage = currentpage;
        this.nextpage = nextpage;
        this.previouspage = previouspage;
        this.totalpage =totalpage;
    }
}