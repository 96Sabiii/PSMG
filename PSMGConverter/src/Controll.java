import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;

/**
 * Created by Stefan on 17.05.2018.
 */
public class Controll {
    private static final String DATA_1_PATH = "data1.csv";
    private static final String DATA_2_PATH = "spells_data.csv";
    private static final String DATA_3_PATH = "relations.csv";
    private CSVReader cr;
    private CSVParser cp;
    private Wizard[] wizards;
    private ArrayList<SpellData> spellsData;
    private MatrixCreator mC1;
    private MatrixCreator mC2;

    public void run(){
        init();
        getData();
        createMatrix();
        printDocument();
    }

    private void createMatrix(){
        mC1 = new MatrixCreator(wizards, spellsData);
        cr = new CSVReader(DATA_3_PATH);
        mC2 = new MatrixCreator(cr.getMatrix());
    }

    private void getData(){
        cp = new CSVParser(cr.getOtherCSV());
        spellsData = cp.getSpellsData();
        cr = new CSVReader(DATA_1_PATH);
        cp = new CSVParser(cr.getCSV(),spellsData);
        wizards = cp.getWizards();
    }

    private void init(){
        cr = new CSVReader(DATA_2_PATH,1);
    }

    private String combineWizardsJSON(){
        String output = "{\n";
        output += "\"wizards\" : [\n";
        for(int i = 0; i < wizards.length; i++){
            if(!(i+1 == wizards.length)) {
                output += wizards[i].toJSON() + ",\n";
            } else {
                output += wizards[i].toJSON() + "\n";
            }
        }
        output += "]\n";
        output += "}";
        return output;
    }

    private String combineSpells(){
        String output = "{\n";
        output += "    \"spellsData\" : [\n";
        for(int i = 0; i < spellsData.size(); i++){
            if(!(i+1 == spellsData.size())) {
                output += spellsData.get(i).toJSON() + ",\n";
            } else {
                output += spellsData.get(i).toJSON() + "\n";
            }
        }
        output += "    ]";
        output += "}";
        return output;
    }


    private void printDocument(){
        try {
            PrintWriter writer = new PrintWriter("data.JSON","UTF-8");
            writer.println(combineWizardsJSON());
            writer.close();
            writer = new PrintWriter("spellsData.JSON", "UTF-8");
            writer.println(combineSpells());
            writer.close();
            writer = new PrintWriter("matrix1.JSON", "UTF-8");
            writer.println(mC1.getJSON());
            writer.close();
            writer = new PrintWriter("matrix2.JSON", "UTF-8");
            mC2.turnMatrix();
            writer.println(mC2.getJSON());
            writer.close();
            writer = new PrintWriter("CF.JSON", "UTF-8");
            writer.println(new CFConverter(wizards).getJSON());
            writer.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }
}
