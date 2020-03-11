package athenarc.imis.sdl.service;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import athenarc.imis.sdl.config.Constants;
import athenarc.imis.sdl.service.util.FileUtil;

@Service
public class DatasetsService {

    private final Logger log = LoggerFactory.getLogger(DatasetsService.class);

    public String upload(String filename, byte[] bytes) throws java.io.IOException {
        log.debug("Uploading " + filename);
        String zipFile = Constants.DATA_DIR + filename;
        Path path = Paths.get(zipFile);
        Files.write(path, bytes);
        return zipFile;
    }

    public Document getSchemas() throws FileNotFoundException, IOException {
        Document response = new Document(); 

        String [] datasetDirs = FileUtil.findSubdirectories(Constants.DATA_DIR);

        for(String dir : datasetDirs) {
            String schemaFile = Constants.DATA_DIR + dir + "/schema.json";
            // System.out.println(FileUtil.readSchema(schemaFile));
            Document schema = Document.parse(FileUtil.readSchema(schemaFile));
            schema.append("folder", dir);
            response.append(schema.get("name").toString(), schema);
            schema.remove("name");
        }
        return response;
    }

    public Document getMetapaths(String dataset) throws FileNotFoundException, IOException {
        Document response = new Document(); 
        String datasetFolder = Constants.DATA_DIR + dataset + "/metapaths";
        String [] files = FileUtil.findFilesInFolder(datasetFolder);

        // remove file extension from files
        String[] metapaths = new String[files.length];
        for (int i=0; i<files.length; i++) {
            metapaths[i] = files[i].substring(0, files[i].lastIndexOf('.'));
        }

        response.append("dataset", dataset);
        response.append("metapaths", metapaths);


        return response;
    }

    public List<Document> autocomplete(String folder, String entity, String field, String term) throws IOException {
        List<Document> docs = new ArrayList<>();
        BufferedReader reader;
        String filename = Constants.DATA_DIR + folder + "/nodes/" + entity + ".csv";
        reader = new BufferedReader(new FileReader(filename));
        
        // read header line and find column of specified field
        String line = reader.readLine();

        String [] columnNames = line.split("\t");
        int i;
        for (i=0; i<columnNames.length; i++) {
            if (columnNames[i].startsWith(field))
                break;
        }

        // loop in lines until find 5 results to return
        while ( ( line = reader.readLine() ) != null) {
            String [] attrs = line.split("\t");

            if (attrs[i].toLowerCase().contains(term)) {
                Document doc = new Document();
                doc.append("id", Integer.parseInt(attrs[0]));
                doc.append("name", attrs[i]);
                docs.add(doc);
                if (docs.size() == 5) {
                    break;
                }
            }

        }
        reader.close();
		
        return docs;
    }
}
