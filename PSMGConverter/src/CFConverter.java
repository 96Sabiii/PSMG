import java.util.ArrayList;
import java.util.HashMap;

/**
 * Created by Stefan on 30.07.2018.
 */
public class CFConverter {
    private Wizard[] wizards;
    private String output;
    private HashMap<String, ArrayList<CFspellContainer>> wizardMap;

    public CFConverter(Wizard[] wizards){
        this.wizards = wizards;
        structureCFData();
    }

    public String getJSON(){
        output = "{\"name\":\"spells\",\"children\":[\n";
        int completeCount = 0;
        for (int i = 0; i < wizards.length; i++){
            output += "    {\"name\":\"" + wizards[i].getName() + "\",\"children\":[\n";
            ArrayList<CFspellContainer> usageData = wizardMap.get(wizards[i].getName());
            int countSpells = 0;
            for (int y = 0; y < usageData.size(); y++){
                CFspellContainer data = usageData.get(y);
                countSpells += data.getCount() * 50;
                output += "        {\"name\":\"" + data.getName() + "\",\"size\":" + (data.getCount() * 50) + "},\n";
            }
            if(usageData.size() != 0) {
                output = output.substring(0, output.length() - 3) + "}\n";
            }
            output += "    ],\"size\":" + countSpells + "},\n";
            completeCount += countSpells;
        }
        output = output.substring(0,output.length()-3) + "}\n";
        output += "    ],\"size\":" + completeCount + "\n}";
        return output;
    }

    private void structureCFData(){
        wizardMap = new HashMap<>();
        for (int i = 0; i < wizards.length; i++){
            ArrayList<Spell> spells = wizards[i].getSpells();
            ArrayList<CFspellContainer> usageData = new ArrayList<>();
            usageData.add(new CFspellContainer("filler"));
            for (int y = 0; y < spells.size(); y++){
                String name = spells.get(y).getName();
                if(!name.equals("")) {
                    boolean contains = false;
                    for (int x = 0; x < usageData.size(); x++) {
                        CFspellContainer data = usageData.get(x);
                        if (data.isEqual(name)) {
                            contains = true;
                            data.raiseCount();
                        }
                    }
                    if (!contains) {
                        usageData.add(new CFspellContainer(name));
                    }
                }
            }
            usageData.remove(0);
            wizardMap.put(wizards[i].getName(), usageData);
        }
    }
}
