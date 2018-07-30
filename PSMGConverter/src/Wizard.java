import java.util.ArrayList;

/**
 * Created by Stefan on 17.05.2018.
 */
public class Wizard {
    private String name;
    private ArrayList<Spell> spells;

    public Wizard(String name, ArrayList<Spell> spells){
        this.name = name;
        this.spells = spells;
    }

    @Override
    public String toString() {
        String spellsString = "";
        for(int i = 0; i < spells.size(); i++){
            spellsString += "(" + spells.get(i) + ") ";
        }
        return name + " spells:" + spellsString;
    }

    public String toJSON(){
        String output = "    {\n";
        output += "    \"name\" : \""+ name +"\",\n";
        output += "    \"spells\" : [\n";
        for(int i = 0; i < spells.size(); i++){
            if(!(spells.get(i).toString().equals("")) || spells.size() == 0) {
                if(!(i+1 == spells.size())) {
                    output += spells.get(i).toJSON(false);
                } else {
                    output += spells.get(i).toJSON(true);
                }
            } else if(i+1 == spells.size()){
                if(output.length() > 55)
                output = output.substring(0,output.length()-2);
            }
        }
        output += "        ]\n";
        output += "    }\n";
        return output;
    }

    public ArrayList<Spell> getSpells(){
        return spells;
    }

    public String getName(){
        return name;
    }
}
