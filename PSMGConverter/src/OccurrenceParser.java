import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;

/**
 * Created by Stefan on 25.05.2018.
 */
public class OccurrenceParser {
    private ArrayList<SpellData> spellsData;

    public OccurrenceParser(ArrayList<SpellData> spellsData){
        this.spellsData = spellsData;
    }

    public String getName(String occurrence){
        for(int i = 0; i < spellsData.size(); i++){
            String name = spellsData.get(i).getName();
            if(occurrence.toLowerCase().contains(name.toLowerCase())){
                return name;
            }
        }
        return "Unknown";
    }
}
