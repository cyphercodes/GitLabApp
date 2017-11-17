import { Component } from "@angular/core";

@Component({
    selector: 'page-issues',
    templateUrl: 'issues.html',
})
export class IssuesPage {

    title: string;
    itemList = [{
        id: 8,
        title: "SQLite",
        text: "opened 2 weeks ago by",
        date: "updated 2 weeks ago",
    },
    {
        id: 7,
        title: "App colors",
        text: "opened 3 weeks ago by",
        date: "updated 3 weeks ago",
    },
    {
        id: 6,
        title: "People",
        text: "opened 4 weeks ago by",
        date: "updated 4weeks ago",
    },
    {
        id: 5,
        title: "First page",
        text: "opened 4 weeks ago by",
        date: "updated 4 weeks ago",
    }];
}