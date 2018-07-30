import java.io.*;
import java.util.ArrayList;

/**
 * Created by Stefan on 17.05.2018.
 */
public class CSVReader {
    private String[][] csv;
    private ArrayList<String> data;
    private File file;
    private int columnsCount;
    private int otherColumnsCount;

    public CSVReader(String path){
        file = new File(path);
        data = new ArrayList<>();
        readFile();
        parseData();
    }

    public CSVReader(String path, int other){
        file = new File(path);
        data = new ArrayList<>();
        readFile();
    }

    private void parseData(){
        String line = data.get(0);
        String[] values = line.split(",");
        csv = new String[data.size()][values.length];
        csv[0] = values;
        columnsCount = values.length;
        for(int i = 1; i < data.size(); i++){
            line = data.get(i);
            values = parseLine(line);
            csv[i] = values;
        }
    }

    public String[][] getOtherCSV(){
        otherColumnsCount = data.get(0).split(";").length;
        csv = new String[data.size()][otherColumnsCount];
        for(int i = 0; i < data.size(); i++){
            String line = data.get(i);
            String[] values = parseLineSemi(line);
            for(int y = 0; y < values.length; y++){
                csv[i][y] = values[y];
            }
        }
        return csv;
    }

    public int[][] getMatrix(){
        int matrixLength = 65;
        int[][] matrix = new int[matrixLength][matrixLength];
        for(int i = 0; i < matrixLength; i++){
            for(int y = 0; y < matrixLength; y++){
                matrix[i][y] = 0;
            }
        }
        for(int i = 1; i < data.size(); i++){
            String[] line = data.get(i).split(",");
            int value1 = Integer.parseInt(line[0]);
            int value2 = Integer.parseInt(line[1]);
            matrix[value1][value2]++;
        }
        return matrix;
    }

    public String[][] getCSV(){
        return csv;
    }

    private void readFile(){
        String line = "";
        try {
            BufferedReader br = new BufferedReader(new FileReader(file));
            while(line != null){
                if(!line.equals("")){
                    data.add(line);
                }
                line = br.readLine();
            }
            br.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private String[] parseLine(String line){
        String[] output = new String[columnsCount];
        int valueCount = 0;
        boolean goOn = true;
        String value = "";
        for(int i = 0; i < line.length(); i++){
            if(line.charAt(i) == '\"'){
                goOn = !goOn;
                continue;
            }
            if(goOn){
                if(line.charAt(i) == ','){
                    output[valueCount] = value;
                    valueCount++;
                    value = "";
                }
            } else {
                value += line.charAt(i);
            }
        }
        return output;
    }

    private String[] parseLineSemi(String line) {
        String[] output = new String[otherColumnsCount];
        String value = "";
        boolean found = false;
        int count = 0;
        for(int i = 0; i < line.length(); i++){
            char current = line.charAt(i);
            if(current == '"'){
                found = !found;
                continue;
            } else if(current == ';' && !found){
                output[count] = value;
                value = "";
                count++;
                continue;
            }
            value += current;
        }
        output[8] = "position";
        return output;
    }

}
