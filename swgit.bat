@ECHO OFF

IF "%1" == "job" (
    IF "%2" == "tng" (
        git config --global user.name "Nikolay Vereshchagin"
        git config --global user.email nikolai@triplenext.com
        ECHO SWITCHED TO TANGIBLEE
    )
) ELSE IF "%1" == "me"  (
    git config --global user.name "Nikolay Vereshchagin"
    git config --global user.email nikolveresh@gmail.com
    ECHO SWITCHED TO ME
)

@ECHO ON