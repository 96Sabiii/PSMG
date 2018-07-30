import java.util.ArrayList;

/**
 * Created by Stefan on 22.06.2018.
 */
public class MatrixCreator {
    private Wizard[] wizards;
    private ArrayList<SpellData> spellsData;
    private int[][] matrix;

    public MatrixCreator(Wizard[] wizards, ArrayList<SpellData> spellsData){
        this.wizards = wizards;
        this.spellsData = spellsData;
        createMatrix();
    }

    public MatrixCreator(int[][] matrix){
        this.matrix = matrix;
    }

    private void createMatrix(){
        matrix = new int[spellsData.size()][wizards.length];
        for(int i = 0; i < wizards.length; i++){
            ArrayList<Spell> spells = wizards[i].getSpells();
            String current = "";
            int count = 0;
            for(int y = 0; y < spellsData.size(); y++){
                for(int x = 0; x < spells.size(); x++){
                    if(spells.get(x).getName().equals(spellsData.get(y).getName())){
                        count++;
                    }
                }
                matrix[y][i] = count;
                count = 0;
            }
        }
    }

    public void turnMatrix(){
        int[][] newMatrix = new int[matrix[0].length][matrix.length];
        for(int i = 0; i < matrix.length; i++){
            for(int y = 0; y < matrix[0].length; y++){
                newMatrix[y][i] = matrix[i][y];
            }
        }
        matrix = newMatrix;
    }

    public String getJSON(){
        String output = "{\n   \"matrix\" : [\n";
        for(int i = 0; i < matrix.length; i++){
            output += "        [        ";
            for(int y = 0; y < matrix[0].length; y++){
                if(!(y == matrix[0].length - 1)) {
                    output += matrix[i][y] + ",";
                } else {
                    output += matrix[i][y];
                }
            }
            if(!(i == matrix.length - 1)) {
                output += "],\n";
            } else {
                output += "]\n";
            }
        }
        output += "    ]\n}";
        return output;
    }
}
