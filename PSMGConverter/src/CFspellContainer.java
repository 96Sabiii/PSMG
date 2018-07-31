/**
 * Created by Stefan on 30.07.2018.
 */
public class CFspellContainer {
    private int count = 1;
    private String name;

    public CFspellContainer(String name){
        this.name = name;
    }

    public void raiseCount(){
        count++;
    }

    public String getName(){
        return name;
    }

    public boolean isEqual(String spellName){
        return spellName.equals(name);
    }

    public int getCount(){
        return count;
    }
}
