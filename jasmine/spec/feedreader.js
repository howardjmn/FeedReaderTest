/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function()
{
    var feedElement = '.feed';
    var entryElement = '.entry';
    var menuHiddenClass = 'menu-hidden';
    var menuIconElement = 'a.menu-icon-link';

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function()
    {
        var i;

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function()
        {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        var feedHasUrl = function(index, url)
        {
            it('feed ' + index + ' has a URL', function()
            {
                expect(url).toBeDefined();
                expect(url).not.toBe('');
            });
        };

        for (i = 0; i < allFeeds.length; i++)
        {
            feedHasUrl(i, allFeeds[i].url);
        }

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        var feedHasName = function(index, name)
        {
            it('feed ' + index + ' has a name', function()
            {
                expect(name).toBeDefined();
                expect(name).not.toBe('');
            });
        };

        for (i = 0; i < allFeeds.length; i++)
        {
            feedHasName(i, allFeeds[i].name);
        }
    });


    /* TODO: Write a new test suite named 'The menu' */
    describe('The Menu', function()
    {
         /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden on load', function()
        {
            // menu is hidden if body has this class
            expect($(document.body).hasClass(menuHiddenClass)).toBe(true);
        });

        /**
            These menu tests are nested because clicking the menu icon requires a wait function
        */
        describe('then the icon click', function()
        {
             /* TODO: Write a test that ensures the menu changes
              * visibility when the menu icon is clicked. This test
              * should have two expectations: does the menu display when
              * clicked and does it hide when clicked again.
              */
            it('after load displays menu', function()
            {
                 $(menuIconElement).click();
                // menu is hidden if body has this class
                expect($(document.body).hasClass(menuHiddenClass)).toBe(false);
            });

            it('while menu displayed hides menu', function()
            {
                $(menuIconElement).click();
                // menu is hidden if body has this class
                expect($(document.body).hasClass(menuHiddenClass)).toBe(true);
            });
        });
    });

    /* TODO: Write a new test suite named 'Initial Entries' */
    describe('Initial Entries', function()
    {
        describe('', function()
        {
             /* TODO: Write a test that ensures when the loadFeed
             * function is called and completes its work, there is at least
             * a single .entry element within the .feed container.
             * Remember, loadFeed() is asynchronous so this test will require
             * the use of Jasmine's beforeEach and asynchronous done() function.
             */
            beforeEach(function(done)
            {
                // make sure feed is empty
                $(feedElement).html('');

                loadFeed(0, done);
            });

            it('there is at least one entry within the feed container', function()
            {
                expect($(feedElement + ' ' + entryElement).length).toBeGreaterThan(0);
            });
        });
    });

    /* TODO: Write a new test suite named 'New Feed Selection' */
    describe('New Feed Selection', function()
    {
        /**
            don't run the test if there aren't at least two feeds to compare
        */
        if (allFeeds.length > 1)
        {
            describe('', function()
            {
                var currentFeed, newFeed;

                /* TODO: Write a test that ensures when a new feed is loaded
                 * by the loadFeed function that the content actually changes.
                 * Remember, loadFeed() is asynchronous.
                 */
                beforeEach(function(done)
                {
                    currentFeed = '';
                    newFeed = '';

                    loadFeed(0, function()
                    {
                        currentFeed = $(feedElement).html();
                        loadFeed(allFeeds.length - 1, function()
                        {
                            newFeed = $(feedElement).html();
                            done();
                        });
                    });
                });

                it('results in new content within the feed container', function()
                {
                    expect(newFeed).not.toBe(currentFeed);
                });
            });
        }
        else
        {
            it('cannot run test because it requires at least 2 feeds, there are ' + allFeeds.length, function()
            {
                expect(allFeeds.length).toBeGreaterThan(1);
            });
        }
    });
}());