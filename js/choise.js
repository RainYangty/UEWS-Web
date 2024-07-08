function cwarnings()
{
    listtype = "warings";
    document.getElementById("list_type").innerText = "ICL历史预警";
    getData();
}

function ccenclist()
{
    listtype = "cenc";
    document.getElementById("list_type").innerText = "CENC测定列表";
    getData();
}