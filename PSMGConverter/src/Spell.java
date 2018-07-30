/**
 * Created by Stefan on 17.05.2018.
 */
public class Spell {
    private String name = "";
    private String occurrence = "";

    public Spell(String occurence, OccurrenceParser oP){
        if(occurence != null && occurence != "") {
            this.occurrence = occurence;
            name = oP.getName(occurence);
        }
    }

    @Override
    public String toString() {
        return occurrence;
    }

    public String getName(){
        return name;
    }

    public String toJSON(boolean isLast){
        if(!name.equals("") && !name.equals("Unknown")) {
            String output = "        {\n";
            output += "        \"name\" : \"" + name + "\",\n";
            output += "        \"occurrence\" : \"" + occurrence + "\"\n";
            output += "        }";
            if(!isLast){
                output += ",";
            }
            output += "\n";
            return output;
        }
        return "";
    }
}
