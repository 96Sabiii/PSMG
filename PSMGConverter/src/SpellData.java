/**
 * Created by Stefan on 08.06.2018.
 */
public class SpellData {
    private String name;
    private String classification;
    private String effect;
    private int DHCount = 0;
    private int HBPCount = 0;
    private int OotPCount = 0;
    private int GoFCount = 0;
    private int PoACount = 0;
    private int CoSCount = 0;
    private int SSCount = 0;

    public SpellData(String name, String classification, String effect, String book){
        this.name = name;
        this.classification = classification;
        this.effect = effect;
        raiseCount(book);
    }

    public void raiseCount(String book){
        if(book.equals("7: DH")){
            DHCount++;
        } else if(book.equals("6: HBP")) {
            HBPCount++;
        } else if(book.equals("5: OotP")) {
            OotPCount++;
        } else if(book.equals("4: GoF")) {
            GoFCount++;
        } else if(book.equals("3: PoA")) {
            PoACount++;
        } else if(book.equals("2: CoS")) {
            CoSCount++;
        } else if(book.equals("1: SS")) {
            SSCount++;
        }
    }

    public String getName(){
        return name;
    }

    public String toJSON(){
        String output = "        {\n";
        output += "        \"name\" : "+ "\"" + name + "\",\n";
        output += "        \"classification\" : "+ "\"" + classification + "\",\n";
        output += "        \"effect\" : "+ "\"" + effect + "\",\n";
        output += "        \"DHCount\" : " + DHCount + ",\n";
        output += "        \"HBPCount\" : " + HBPCount + ",\n";
        output += "        \"OotPCount\" : " + OotPCount + ",\n";
        output += "        \"GoFCount\" : " + GoFCount + ",\n";
        output += "        \"PoACount\" : " + PoACount + ",\n";
        output += "        \"CoSCount\" : " + CoSCount + ",\n";
        output += "        \"SSCount\" : " + SSCount + ",\n";
        int total = DHCount + HBPCount + OotPCount + GoFCount + PoACount + CoSCount + SSCount;
        output += "        \"totalCount\" : " + total + "\n";
        output += "        }";
        return output;
    }
}
