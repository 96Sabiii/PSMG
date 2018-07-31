import java.util.ArrayList;

/**
 * Created by Stefan on 17.05.2018.
 */
public class CSVParser {
    private Wizard[] wizards;
    private ArrayList<SpellData> spellsData;
    private String[][] csv;
    private OccurrenceParser oP;

    public CSVParser(String[][] csv){
        this.csv = csv;
        spellsData = new ArrayList<>();
        parseOtherCSV();
    }

    public CSVParser(String[][] csv, ArrayList<SpellData> spellsData){
        this.csv = csv;
        oP = new OccurrenceParser(spellsData);
        wizards = new Wizard[csv[0].length];
        parseCSV();
    }

    private void parseCSV(){
        for(int i = 0; i < csv[0].length; i++){
            String name = csv[0][i];
            ArrayList<Spell> spells = new ArrayList<>();
            for(int y = 1; y < csv.length; y++){
                if (i < csv[i].length) {
                    Spell spell = new Spell(csv[y][i],oP);
                    spells.add(spell);
                }
            }
            Wizard wizard = new Wizard(name,spells);
            wizards[i] = wizard;
        }
    }

    private void parseOtherCSV(){
        boolean found = false;
        spellsData = new ArrayList<>();
        for(int i = 1; i < csv.length; i++) {
            for (int x = 0; x < spellsData.size(); x++) {
                if (csv[i][4].equals(spellsData.get(x).getName())) {
                    spellsData.get(x).raiseCount(csv[i][0]);
                    found = true;
                }
            }
            if(!found) {
                SpellData spell = new SpellData(csv[i][4],csv[i][5],csv[i][6],csv[i][0]);
                spellsData.add(spell);
            }
            found = false;
        }
    }

    public ArrayList<SpellData> getSpellsData() {
        return spellsData;
    }

    public Wizard[] getWizards(){
        return wizards;
    }
}
