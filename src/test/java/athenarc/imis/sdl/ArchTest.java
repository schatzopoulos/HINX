package athenarc.imis.sdl;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("athenarc.imis.sdl");

        noClasses()
            .that()
                .resideInAnyPackage("athenarc.imis.sdl.service..")
            .or()
                .resideInAnyPackage("athenarc.imis.sdl.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..athenarc.imis.sdl.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
